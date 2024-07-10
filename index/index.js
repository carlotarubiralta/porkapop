// porkapop/index/index.js
import ProductListController from './ProductListController.js';
import HeaderController from '../shared/header/HeaderController.js';

document.addEventListener('DOMContentLoaded', () => {
    new ProductListController();
    new HeaderController(document.querySelector('header'));
});