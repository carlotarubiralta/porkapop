// porkapop/shared/ProductService.js
import ApiService from './ApiService.js';

class ProductService {
    static async getProducts() {
        return await ApiService.get('products');
    }

    static async getProductById(id) {
        return await ApiService.get(`products/${id}`);
    }

    static async createProduct(product, token) {
        return await ApiService.post('products', product, token);
    }
}

export default ProductService;
