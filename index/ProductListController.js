// porkapop/index/ProductListController.js
import ProductService from '../shared/ProductService.js';
import { renderProductList, renderError, renderLoading } from './productView.js';

class ProductListController {
    constructor() {
        this.init();
    }

    async init() {
        renderLoading();
        try {
            const products = await ProductService.getProducts();
            renderProductList(products);
        } catch (error) {
            renderError(error.message);
        }
    }
}

export default ProductListController;
