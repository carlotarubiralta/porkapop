import CreateProductPageController from './CreateProductPageController.js';
import HeaderController from '../shared/header/HeaderController.js';

document.addEventListener('DOMContentLoaded', () => {
    new CreateProductPageController();
    new HeaderController(document.querySelector('header'));
});
