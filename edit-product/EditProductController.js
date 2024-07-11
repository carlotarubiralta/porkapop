import ProductService from '../shared/ProductService.js';
import AuthService from '../shared/AuthService.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';
import { renderEditForm } from './editProductView.js';

class EditProductController {
    constructor() {
        this.notificationView = new NotificationView();
        this.spinnerView = new SpinnerView();
        this.init();
    }

    async init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        console.log("Product ID:", id);

        if (!id) {
            this.notificationView.showError('ID de producto no especificado');
            return;
        }

        try {
            this.spinnerView.showSpinner();
            const product = await ProductService.getProductById(id);
            console.log("Product Data:", product);
            this.spinnerView.hideSpinner();

            if (!product) {
                this.notificationView.showError('Producto no encontrado');
                return;
            }

            renderEditForm(product);
            this.addFormSubmitListener(id);
        } catch (error) {
            this.spinnerView.hideSpinner();
            this.notificationView.showError(error.message);
        }
    }

    addFormSubmitListener(id) {
        const form = document.getElementById('update-product-form');
        if (!form) {
            console.error("Form not found");
            return;
        }
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log("Form submitted");

            const formData = new FormData(form);
            const productData = {
                title: formData.get('title'),
                description: formData.get('description'),
                price: parseFloat(formData.get('price')),
                type: formData.get('type'),
                category: formData.get('category'),
                image: formData.get('image')
            };
            console.log("Product Data to Update:", productData);

            try {
                this.spinnerView.showSpinner();
                await ProductService.updateProduct(id, productData, AuthService.getToken());
                this.spinnerView.hideSpinner();

                console.log("Show success notification");
                this.notificationView.showSuccess('Producto modificado con éxito. Redirigiendo a la lista de productos...');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);

            } catch (error) {
                this.spinnerView.hideSpinner();
                this.notificationView.showError(error.message);
            }
        });
    }
}

export default EditProductController;
