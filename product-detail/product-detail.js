import ProductDetailPageController from './ProductDetailPageController.js';
import HeaderController from '../shared/header/HeaderController.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("product-detail.js loaded");  // Verificar que el archivo se carga
    new ProductDetailPageController();
    new HeaderController(document.querySelector('header'));
});
