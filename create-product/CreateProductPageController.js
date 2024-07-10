// porkapop/create-product/CreateProductPageController.js
import PageController from '../shared/PageController.js';
import CreateProductFormController from './CreateProductFormController.js';

class CreateProductPageController {
    constructor() {
        this.pageController = new PageController();
        this.createProductFormController = new CreateProductFormController(document.getElementById('create-product-form'));
    }
}

export default CreateProductPageController;
