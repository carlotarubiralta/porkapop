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

    static async deleteProduct(id, token) {
        return await ApiService.delete(`products/${id}`, token);
    }

    static async updateProduct(id, product, token) {
        return await ApiService.put(`products/${id}`, product, token);
    }
}

export default ProductService;
