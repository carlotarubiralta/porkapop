// porkapop/shared/ApiService.js
import { localStorageService } from './LocalStorageService.js';

class ApiService {
    static async get(endpoint) {
        const token = localStorageService.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }

    static async post(endpoint, data, token = null) {
        const url = endpoint.startsWith('auth/') ? `http://127.0.0.1:8000/${endpoint}` : `http://127.0.0.1:8000/api/${endpoint}`;
        const authToken = token || localStorageService.getItem('token');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` })
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Network response was not ok');
        }
        return responseData;
    }

    static async delete(endpoint, token = null) {
        const authToken = token || localStorageService.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` })
            }
        });
        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message || 'Network response was not ok');
        }
        return true;
    }

    static async put(endpoint, data, token = null) {
        const authToken = token || localStorageService.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` })
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Network response was not ok');
        }
        return responseData;
    }
}

export default ApiService;
