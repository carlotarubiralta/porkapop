import ProductService from '../shared/ProductService.js';
import AuthService from '../shared/AuthService.js';
import { renderProductDetail, renderEditForm } from './productDetailView.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';

class ProductDetailController {
    constructor() {
        this.notificationView = new NotificationView();
        this.spinnerView = new SpinnerView();
        this.init();
    }

    async init() {
        console.log('Initializing ProductDetailController...');
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        this.productId = productId;

        if (!productId) {
            console.error('ID de producto no especificado');
            this.notificationView.showError('ID de producto no especificado');
            return;
        }

        this.spinnerView.showSpinner();
        console.log(`Loading product with ID: ${productId}`);

        try {
            const product = await ProductService.getProductById(productId);
            console.log('Product loaded:', product);
            const token = AuthService.getToken();
            const decodedToken = token ? AuthService.decodeToken(token) : null;
            console.log('Decoded token:', decodedToken);
            const isOwner = decodedToken && decodedToken.userId === product.userId;

            renderProductDetail(product, isOwner);
            this.spinnerView.hideSpinner();

            if (isOwner) {
                const deleteButton = document.getElementById('delete-ad-btn');
                if (deleteButton) {
                    deleteButton.classList.remove('hidden');
                    deleteButton.addEventListener('click', async () => {
                        if (confirm('¿Estás seguro de que deseas eliminar este anuncio?')) {
                            this.spinnerView.showSpinner();
                            console.log(`Deleting product with ID: ${this.productId}`);
                            await ProductService.deleteProduct(this.productId, token);
                            this.spinnerView.hideSpinner();
                            this.notificationView.showSuccess('Anuncio eliminado con éxito');
                            window.location.href = 'index.html';
                        }
                    });
                }

                const editButton = document.getElementById('edit-ad-btn');
                if (editButton) {
                    editButton.classList.remove('hidden');
                    editButton.addEventListener('click', () => {
                        console.log('Rendering edit form...');
                        renderEditForm(product);
                    });
                }

                document.addEventListener('submit', async (event) => {
                    if (event.target && event.target.id === 'edit-product-form') {
                        event.preventDefault();
                        console.log('Submitting edit form...');
                        this.spinnerView.showSpinner();

                        const formData = new FormData(event.target);
                        const updatedProduct = {
                            title: formData.get('title'),
                            description: formData.get('description'),
                            price: parseFloat(formData.get('price')),
                            type: formData.get('type'),
                            image: formData.get('image-url'),
                            userId: product.userId
                        };

                        console.log('Updated product data:', updatedProduct);

                        try {
                            await ProductService.updateProduct(this.productId, updatedProduct, token);
                            this.spinnerView.hideSpinner();
                            this.notificationView.showSuccess('Anuncio actualizado con éxito');
                            const updatedProductFromServer = await ProductService.getProductById(this.productId);
                            renderProductDetail(updatedProductFromServer, isOwner);
                        } catch (error) {
                            this.spinnerView.hideSpinner();
                            this.notificationView.showError(`Error al actualizar el anuncio: ${error.message}`);
                        }
                    }
                });
            }
        } catch (error) {
            this.spinnerView.hideSpinner();
            console.error('Error loading product:', error);
            this.notificationView.showError(error.message);
        }
    }
}

export default ProductDetailController;
