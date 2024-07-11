import ApiService from './ApiService.js';

class ProductService {
    static async getProducts(page = 1, limit = 8, searchQuery = '') {
        let endpoint = `products?_page=${page}&_limit=${limit}`;
        if (searchQuery) {
            endpoint += `&q=${searchQuery}`;
        }
        return ApiService.get(endpoint);
    }
    static async getProductById(id) {
        return await ApiService.get(`products/${id}`);
    }

    static async createProduct(productData, token) {
        return await ApiService.post(`products`, productData, token);
    }

    static async updateProduct(id, productData, token) {
        return await ApiService.put(`products/${id}`, productData, token);
    }

    static async deleteProduct(id, token) {
        return await ApiService.delete(`products/${id}`, token);
    }
}

export default ProductService;
