// porkapop/shared/AuthService.js
import ApiService from './ApiService.js';

class AuthService {
    static async login(username, password) {
        try {
            console.log('Sending login request:', { username, password });
            const response = await ApiService.post('auth/login', { username, password });
            console.log('Login response:', response); // Verifica la respuesta del servidor
            const { accessToken } = response; // Cambiamos token a accessToken
            if (!accessToken) {
                throw new Error('No token received');
            }
            localStorage.setItem('jwt', accessToken); // Cambiamos token a accessToken
            return accessToken;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async register(username, password) {
        try {
            console.log('Sending register request:', { username, password });
            const response = await ApiService.post('auth/register', { username, password });
            return response;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    }

    static logout() {
        localStorage.removeItem('jwt');
    }

    static getToken() {
        return localStorage.getItem('jwt');
    }

    static isAuthenticated() {
        return !!AuthService.getToken();
    }

    static decodeToken(token) {
        if (!token) {
            return null;
        }
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }
}

export default AuthService;
