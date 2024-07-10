// porkapop/shared/ApiService.js
class ApiService {
    static async get(endpoint) {
        const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }

    static async post(endpoint, data, token = null) {
        const url = endpoint.startsWith('auth/') ? `http://127.0.0.1:8000/${endpoint}` : `http://127.0.0.1:8000/api/${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
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
