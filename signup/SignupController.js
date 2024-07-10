// porkapop/signup/SignupController.js
import AuthService from '../shared/AuthService.js';

class SignupController {
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
                await AuthService.register(username, password);
                // Iniciar sesión automáticamente después del registro
                await AuthService.login(username, password);
                alert('Registro exitoso');
                window.location.href = 'index.html';
            } catch (error) {
                alert(`Error al registrarse: ${error.message}`);
            }
        });
    }
}

export default SignupController;
