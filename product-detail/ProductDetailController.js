// porkapop/product-detail/ProductDetailController.js
import ProductService from '../shared/ProductService.js';
import AuthService from '../shared/AuthService.js';
import { renderProductDetail, renderError, renderLoading, renderEditForm } from './productDetailView.js';

class ProductDetailController {
    constructor() {
        this.init();
    }

    async init() {
        console.log('Initializing ProductDetailController...');
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        this.productId = productId;

        if (!productId) {
            console.error('ID de producto no especificado');
            renderError('ID de producto no especificado');
            return;
        }

        renderLoading();
        console.log(`Loading product with ID: ${productId}`);

        try {
            const product = await ProductService.getProductById(productId);
            console.log('Product loaded:', product);
            const token = AuthService.getToken();
            const decodedToken = token ? AuthService.decodeToken(token) : null;
            console.log('Decoded token:', decodedToken);
            const isOwner = decodedToken && decodedToken.userId === product.userId;

            renderProductDetail(product, isOwner);

            if (isOwner) {
                const deleteButton = document.getElementById('delete-ad-btn');
                if (deleteButton) {
                    deleteButton.classList.remove('hidden');
                    deleteButton.addEventListener('click', async () => {
                        if (confirm('¿Estás seguro de que deseas eliminar este anuncio?')) {
                            console.log(`Deleting product with ID: ${this.productId}`);
                            await ProductService.deleteProduct(this.productId, token);
                            alert('Anuncio eliminado con éxito');
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
                            alert('Anuncio actualizado con éxito');
                            const updatedProductFromServer = await ProductService.getProductById(this.productId);
                            renderProductDetail(updatedProductFromServer, isOwner);
                        } catch (error) {
                            alert(`Error al actualizar el anuncio: ${error.message}`);
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error loading product:', error);
            renderError(error.message);
        }
    }
}

export default ProductDetailController;
