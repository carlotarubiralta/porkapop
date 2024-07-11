import EditProductController from './EditProductController.js';
import HeaderController from '../shared/header/HeaderController.js';


document.addEventListener('DOMContentLoaded', () => {
    new EditProductController();
    new HeaderController(document.querySelector('header'));
});
