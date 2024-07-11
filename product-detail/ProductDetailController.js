import ProductService from '../shared/ProductService.js';
import AuthService from '../shared/AuthService.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';
import { renderProductDetail, renderEditForm, renderError } from './productDetailView.js';

class ProductDetailController {
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

            renderProductDetail(product);

            if (user && user.userId === product.userId) {
                this.showEditDeleteButtons(productId, product);
            }
        } catch (error) {
            this.spinnerView.hideSpinner();
            this.notificationView.showError(error.message);
        }
    }

    showEditDeleteButtons(productId, product) {
        const editButton = document.createElement('a');
        editButton.textContent = 'Editar';
        editButton.className = 'bg-blue-500 text-white p-2 rounded mt-4 inline-block';
        editButton.href = `editProduct.html?id=${productId}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'bg-red-500 text-white p-2 rounded mt-4 ml-2';
        deleteButton.addEventListener('click', async () => {
            const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este producto?');
            if (confirmDelete) {
                try {
                    await ProductService.deleteProduct(productId, AuthService.getToken());
                    this.notificationView.showSuccess('Producto eliminado con éxito');
                    window.location.href = 'index.html';
                } catch (error) {
                    this.notificationView.showError(`Error al eliminar el producto: ${error.message}`);
                }
            }
        });

        const detailElement = document.getElementById('product-detail');
        detailElement.appendChild(editButton);
        detailElement.appendChild(deleteButton);
    }

    renderError(message) {
        const productDetailElement = document.getElementById('product-detail');
        productDetailElement.innerHTML = `<p class="text-red-500">${message}</p>`;
    }
}

export default ProductDetailController;
