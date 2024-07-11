import AuthService from '../shared/AuthService.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';


class LoginController {
    constructor() {
        this.notificationView = new NotificationView();
        this.spinnerView = new SpinnerView();
        this.init();
    }

    init() {
        const formElement = document.getElementById('login-form');
        formElement.addEventListener('submit', async (event) => {
            event.preventDefault();

            this.spinnerView.showSpinner();

            const formData = new FormData(formElement);
            const username = formData.get('username');
            const password = formData.get('password');

            try {
                const response = await AuthService.login(username, password);
                this.spinnerView.hideSpinner();
                this.notificationView.showSuccess('Inicio de sesión exitoso');
                window.location.href = 'index.html';
            } catch (error) {
                this.spinnerView.hideSpinner();
                this.notificationView.showError(`Error al iniciar sesión: ${error.message}`);
            }
        });
    }
}

export default LoginController;
