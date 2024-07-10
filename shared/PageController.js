// porkapop/shared/PageController.js
import { localStorageService } from './LocalStorageService.js';
import AuthService from './AuthService.js';

class PageController {
    constructor() {
        this.init();
    }

    init() {
        const token = localStorageService.getItem('token');
        if (token) {
            this.setAuthState(true, AuthService.decodeToken(token));
        } else {
            this.setAuthState(false);
        }
    }

    setAuthState(isAuthenticated, user = null) {
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userGreeting = document.getElementById('user-greeting');

        if (!loginBtn || !signupBtn || !logoutBtn || !userGreeting) {
            console.error('One or more elements are not found in the DOM');
            return;
        }

        if (isAuthenticated) {
            loginBtn.classList.add('hidden');
            signupBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            userGreeting.classList.remove('hidden');
            userGreeting.textContent = `¡Hola, ${user.username}!`;
        } else {
            loginBtn.classList.remove('hidden');
            signupBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            userGreeting.classList.add('hidden');
        }

        logoutBtn.addEventListener('click', () => {
            AuthService.logout();
            this.setAuthState(false);
            window.location.href = 'index.html';
        });
    }
}

export default PageController;
