// porkapop/shared/AuthService.js
import ApiService from './ApiService.js';
import { localStorageService } from './LocalStorageService.js';

class AuthService {
    static async login(username, password) {
        const response = await ApiService.post('auth/login', { username, password }, null);
        if (!response.accessToken) {
            throw new Error('No token received');
        }
        localStorageService.setItem('token', response.accessToken);
        return response;
    }

    static async register(username, password) {
        const response = await ApiService.post('auth/register', { username, password }, null);
        return response;
    }

    static getToken() {
        return localStorageService.getItem('token');
    }

    static decodeToken(token) {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

    static logout() {
        localStorageService.removeItem('token');
    }
}

export default AuthService;
