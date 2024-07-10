// porkapop/shared/ProductService.js
import ApiService from './ApiService.js';

class ProductService {
    static async getProducts() {
        return await ApiService.get('api/products');
    }

    static async getProductById(id) {
        return await ApiService.get(`api/products/${id}`);
    }

    static async createProduct(product, token) {
        return await ApiService.post('api/products', product, token);
    }

    // Otros métodos update, delete, etc.
}

export default ProductService;
