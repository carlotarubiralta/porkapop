// porkapop/product-detail/product-detail.js
import ProductDetailPageController from './ProductDetailPageController.js';
import HeaderController from '../shared/header/HeaderController.js';



document.addEventListener('DOMContentLoaded', () => {
    new ProductDetailPageController();
    new HeaderController(document.querySelector('header'));
});
