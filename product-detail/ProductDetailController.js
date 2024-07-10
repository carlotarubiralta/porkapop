// porkapop/product-detail/ProductDetailController.js
import ProductService from '../shared/ProductService.js';
import { renderProductDetail, renderError, renderLoading } from './productDetailView.js';

class ProductDetailController {
    constructor() {
        this.init();
    }

    async init() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');

        if (!productId) {
            renderError('ID de producto no especificado');
            return;
        }

        renderLoading();

        try {
            const product = await ProductService.getProductById(productId);
            renderProductDetail(product);
        } catch (error) {
            renderError(error.message);
        }
    }
}

export default ProductDetailController;
