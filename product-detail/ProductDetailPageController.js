// porkapop/product-detail/ProductDetailPageController.js
import ProductDetailController from './ProductDetailController.js';
import PageController from '../shared/PageController.js';

class ProductDetailPageController {
    constructor() {
        this.pageController = new PageController();
        this.productDetailController = new ProductDetailController();
    }
}

export default ProductDetailPageController;
