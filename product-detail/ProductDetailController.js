// porkapop/product-detail/ProductDetailController.js
import ProductService from '../shared/ProductService.js';
import { renderProductDetail, renderEditForm, renderLoading, renderError } from './productDetailView.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';
import AuthService from '../shared/AuthService.js';

class ProductDetailController {
    constructor() {
        this.notificationView = new NotificationView();
        this.spinnerView = new SpinnerView();
        this.productId = new URLSearchParams(window.location.search).get('id');
        this.init();
    }

    async init() {
        if (!this.productId) {
            this.renderError('ID de producto no especificado');
            return;
        }

        this.spinnerView.showSpinner();
        try {
            const product = await ProductService.getProductById(this.productId);
            const token = AuthService.getToken();
            const decodedToken = AuthService.decodeToken(token);
            const isOwner = product.userId === decodedToken.userId;

            this.renderProductDetail(product, isOwner);

            if (isOwner) {
                this.setupOwnerActions(product);
            }

            this.spinnerView.hideSpinner();
        } catch (error) {
            this.spinnerView.hideSpinner();
            this.renderError(error.message);
        }
    }

    renderProductDetail(product, isOwner) {
        renderProductDetail(product, isOwner);
    }

    renderError(message) {
        renderError(message);
    }

    setupOwnerActions(product) {
        const deleteBtn = document.getElementById('delete-ad-btn');
        const editBtn = document.getElementById('edit-ad-btn');

        if (deleteBtn) {
            deleteBtn.addEventListener('click', async () => {
                if (confirm('¿Estás seguro de que deseas eliminar este anuncio?')) {
                    this.spinnerView.showSpinner();
                    try {
                        await ProductService.deleteProduct(product.id);
                        this.spinnerView.hideSpinner();
                        this.notificationView.showSuccess('Anuncio eliminado con éxito');
                        window.location.href = 'index.html';
                    } catch (error) {
                        this.spinnerView.hideSpinner();
                        this.notificationView.showError(`Error al eliminar el anuncio: ${error.message}`);
                    }
                }
            });
        }

        if (editBtn) {
            editBtn.addEventListener('click', () => {
                renderEditForm(product);
                this.setupEditForm(product);
            });
        }
    }

    setupEditForm(product) {
        const editForm = document.getElementById('edit-product-form');
        if (editForm) {
            editForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const formData = new FormData(editForm);
                const updatedProduct = {
                    title: formData.get('title'),
                    description: formData.get('description'),
                    price: formData.get('price'),
                    type: formData.get('type'),
                    image: formData.get('image-url')
                };

                this.spinnerView.showSpinner();
                try {
                    await ProductService.updateProduct(this.productId, updatedProduct);
                    this.spinnerView.hideSpinner();
                    this.notificationView.showSuccess('Anuncio actualizado con éxito');
                    this.renderProductDetail(updatedProduct, true);
                } catch (error) {
                    this.spinnerView.hideSpinner();
                    this.notificationView.showError(`Error al actualizar el anuncio: ${error.message}`);
                }
            });
        }
    }
}

export default ProductDetailController;
