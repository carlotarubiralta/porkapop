// index/ProductListController.js
import ApiService from '../shared/ApiService.js';
import { renderProductList, renderError, renderLoading } from './productView.js';

export default class ProductListController {
    constructor() {
        this.init();
    }

    async init() {
        renderLoading();
        try {
            const products = await ApiService.get('products');
            renderProductList(products);
        } catch (error) {
            renderError(error.message);
        }
    }
}
