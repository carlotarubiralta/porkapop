import ProductService from '../shared/ProductService.js';
import AuthService from '../shared/AuthService.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';
import { renderEditForm, renderError } from './editProductView.js';

class EditProductController {
    constructor() {
        this.notificationView = new NotificationView();
        this.spinnerView = new SpinnerView();
        this.init();
    }

    async init() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');

        if (!productId) {
            renderError('ID de producto no especificado');
            return;
        }

        try {
            this.spinnerView.showSpinner();
            const product = await ProductService.getProductById(productId);
            this.spinnerView.hideSpinner();

            const user = AuthService.decodeToken(AuthService.getToken());

            if (user && user.userId === product.userId) {
                renderEditForm(product);
                this.handleEditFormSubmit(productId);
            } else {
                renderError('No tienes permiso para editar este producto');
            }
        } catch (error) {
            this.spinnerView.hideSpinner();
            this.notificationView.showError(error.message);
        }
    }

    handleEditFormSubmit(productId) {
        const editForm = document.getElementById('update-product-form');
        if (editForm) {
            editForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                this.spinnerView.showSpinner();

                const formData = new FormData(editForm);
                const updatedProduct = {
                    title: formData.get('title'),
                    description: formData.get('description'),
                    price: parseFloat(formData.get('price')),
                    type: formData.get('type'),
                    category: formData.get('category'),
                    image: formData.get('image-url')
                };

                try {
                    await ProductService.updateProduct(productId, updatedProduct, AuthService.getToken());
                    this.spinnerView.hideSpinner();
                    this.notificationView.showSuccess('Producto actualizado con éxito');
                    window.location.href = `productDetail.html?id=${productId}`;
                } catch (error) {
                    this.spinnerView.hideSpinner();
                    this.notificationView.showError(`Error al actualizar el producto: ${error.message}`);
                }
            });
        }
    }
}

export default EditProductController;
