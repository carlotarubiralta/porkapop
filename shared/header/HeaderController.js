// porkapop/shared/header/HeaderController.js
import AuthService from '../AuthService.js';

class HeaderController {
    constructor(headerElement) {
        this.headerElement = headerElement;
        this.updateHeader();
    }

    updateHeader() {
        const token = AuthService.getToken();
        const loginBtn = this.headerElement.querySelector('#login-btn');
        const signupBtn = this.headerElement.querySelector('#signup-btn');
        const userGreeting = this.headerElement.querySelector('#user-greeting');
        const logoutBtn = this.headerElement.querySelector('#logout-btn');
        const createAdBtn = this.headerElement.querySelector('#create-ad-btn');

        if (token) {
            const decodedToken = AuthService.decodeToken(token);
            const username = decodedToken.username;

            if (userGreeting) {
                userGreeting.textContent = `¡Hola, ${username}!`;
                userGreeting.classList.remove('hidden');
            }

            if (logoutBtn) {
                logoutBtn.classList.remove('hidden');
                logoutBtn.addEventListener('click', () => {
                    AuthService.logout();
                    window.location.href = 'index.html';
                });
            }

            if (createAdBtn) {
                createAdBtn.classList.remove('hidden');
            }

            if (loginBtn) loginBtn.classList.add('hidden');
            if (signupBtn) signupBtn.classList.add('hidden');
        } else {
            if (userGreeting) userGreeting.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
            if (createAdBtn) createAdBtn.classList.add('hidden');
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (signupBtn) signupBtn.classList.remove('hidden');
        }
    }
}

export default HeaderController;
