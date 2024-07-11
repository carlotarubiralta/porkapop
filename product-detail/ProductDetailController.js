import ProductService from '../shared/ProductService.js';
import AuthService from '../shared/AuthService.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';
import { renderProductDetail } from './productDetailView.js';

class ProductDetailController {
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

            renderProductDetail(product);
            this.showEditAndDeleteButtons(product);

        } catch (error) {
            this.spinnerView.hideSpinner();
            this.notificationView.showError(error.message);
        }
    }

    showEditAndDeleteButtons(product) {
        const token = AuthService.getToken();
        if (!token) {
            console.error('No token found');
            return;
        }

        const currentUser = AuthService.decodeToken(token);
        if (!currentUser) {
            console.error('Token could not be decoded');
            return;
        }

        const editButton = document.getElementById('edit-product-button');
        const deleteButton = document.getElementById('delete-product-button');

        if (currentUser.userId === product.userId) {
            if (editButton) {
                editButton.classList.remove('hidden');
                editButton.addEventListener('click', () => {
                    window.location.href = `editProduct.html?id=${product.id}`;
                });
            }

            if (deleteButton) {
                deleteButton.classList.remove('hidden');
                deleteButton.addEventListener('click', async () => {
                    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                        return;
                    }

                    try {
                        this.spinnerView.showSpinner();
                        await ProductService.deleteProduct(product.id, token);
                        this.spinnerView.hideSpinner();
                        this.notificationView.showSuccess('Producto eliminado con éxito. Redirigiendo a la lista de productos...');
                        
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 3000);

                    } catch (error) {
                        this.spinnerView.hideSpinner();
                        this.notificationView.showError(`Error al eliminar el producto: ${error.message}`);
                    }
                });
            }
        } else {
            if (editButton) {
                editButton.classList.add('hidden');
            }
            if (deleteButton) {
                deleteButton.classList.add('hidden');
            }
        }
    }
}

export default ProductDetailController;
