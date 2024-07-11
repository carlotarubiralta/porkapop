// porkapop/shared/ProductService.js
import ApiService from './ApiService.js';

class ProductService {
    static async getProducts(page = 1, perPage = 8) {
        const endpoint = `products?_page=${page}&_limit=${perPage}`;
        return await ApiService.get(endpoint);
    }

    static async getProductById(id) {
        const endpoint = `products/${id}`;
        return await ApiService.get(endpoint);
    }

    static async createProduct(product) {
        const endpoint = 'products';
        return await ApiService.post(endpoint, product);
    }

    static async updateProduct(id, product) {
        const endpoint = `products/${id}`;
        return await ApiService.put(endpoint, product);
    }

    static async deleteProduct(id) {
        const endpoint = `products/${id}`;
        return await ApiService.delete(endpoint);
    }
}

export default ProductService;
