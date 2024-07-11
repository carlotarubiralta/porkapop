import ProductDetailController from './ProductDetailController.js';
import PageController from '../shared/PageController.js';

class ProductDetailPageController {
    constructor() {
        console.log("ProductDetailPageController initialized");  // Verificar que el controlador se inicializa
        this.pageController = new PageController();
        this.productDetailController = new ProductDetailController();
    }
}

export default ProductDetailPageController;
