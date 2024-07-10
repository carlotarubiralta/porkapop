// porkapop/index/index.js
import ProductListController from './ProductListController.js';
import PageController from '../shared/PageController.js';

document.addEventListener('DOMContentLoaded', () => {
    new PageController();
    new ProductListController();
});
