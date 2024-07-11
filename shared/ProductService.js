// porkapop/shared/ProductService.js
import ApiService from './ApiService.js';

class ProductService {
    static async getProducts(page = 1, limit = 8, searchQuery = '') {
        let endpoint = `products?_page=${page}&_limit=${limit}`;
        if (searchQuery) {
            endpoint += `&q=${searchQuery}`;
        }
        return ApiService.get(endpoint);
    }

    static async createProduct(product, token) {
        return ApiService.post('products', product, token);
    }

    static async getProductById(id) {
        return ApiService.get(`products/${id}`);
    }

    static async updateProduct(id, product, token) {
        return ApiService.put(`products/${id}`, product, token);
    }

    static async deleteProduct(id, token) {
        return ApiService.delete(`products/${id}`, token);
    }
}

export default ProductService;
