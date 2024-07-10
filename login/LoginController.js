// porkapop/login/LoginController.js
import AuthService from '../shared/AuthService.js';

class LoginController {
    constructor(formElement) {
        this.formElement = formElement;
        this.addEventListeners();
    }

    addEventListeners() {
        this.formElement.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(this.formElement);
            const username = formData.get('username');
            const password = formData.get('password');

            try {
                await AuthService.login(username, password);
                alert('Login exitoso');
                window.location.href = 'index.html';
            } catch (error) {
                alert(`Error al iniciar sesión: ${error.message}`);
            }
        });
    }
}

export default LoginController;
