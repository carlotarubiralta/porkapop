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
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const formData = new FormData(signupForm);
                const username = formData.get('username');
                const password = formData.get('password');

                this.spinnerView.showSpinner();
                try {
                    const response = await AuthService.register(username, password);
                    this.spinnerView.hideSpinner();
                    this.notificationView.showSuccess('Usuario creado con éxito');
                    // Redirigir a index.html con la sesión iniciada
                    await this.loginUser(username, password);
                } catch (error) {
                    this.spinnerView.hideSpinner();
                    this.notificationView.showError(`Error al crear el usuario: ${error.message}`);
                }
            });
        }
    }

    async loginUser(username, password) {
        this.spinnerView.showSpinner();
        try {
            const response = await AuthService.login(username, password);
            this.spinnerView.hideSpinner();
            this.notificationView.showSuccess('Sesión iniciada con éxito');
            window.location.href = 'index.html';
        } catch (error) {
            this.spinnerView.hideSpinner();
            this.notificationView.showError(`Error al iniciar sesión: ${error.message}`);
        }
    }
}

export default SignupController;