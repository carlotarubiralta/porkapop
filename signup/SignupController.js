import AuthService from '../shared/AuthService.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';

class SignupController {
    constructor() {
        this.notificationView = new NotificationView();
        this.spinnerView = new SpinnerView();
        this.init();
    }

    init() {
        const formElement = document.getElementById('signup-form');
        formElement.addEventListener('submit', async (event) => {
            event.preventDefault();

            this.spinnerView.showSpinner();

            const formData = new FormData(formElement);
            const username = formData.get('username');
            const password = formData.get('password');

            try {
                const response = await AuthService.register(username, password);
                this.spinnerView.hideSpinner();
                this.notificationView.showSuccess('Registro exitoso');
                window.location.href = 'login.html';
            } catch (error) {
                this.spinnerView.hideSpinner();
                this.notificationView.showError(`Error al registrar: ${error.message}`);
            }
        });
    }
}

export default SignupController;
