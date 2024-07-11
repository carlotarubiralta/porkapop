import AuthService from '../AuthService.js';

class HeaderController {
    constructor() {
        this.init();
    }

    init() {
        this.renderUserOptions();
        const logoutButton = document.getElementById('logout-btn');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => this.logout());
        }
    }

    renderUserOptions() {
        const token = AuthService.getToken();
        const userGreeting = document.getElementById('user-greeting');
        const createAdBtn = document.getElementById('create-ad-btn');
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (token) {
            const user = AuthService.decodeToken(token);
            if (userGreeting) {
                userGreeting.textContent = `Hola, ${user.username}`;
                userGreeting.classList.remove('hidden');
            }
            if (createAdBtn) {
                createAdBtn.classList.remove('hidden');
            }
            if (loginBtn) {
                loginBtn.classList.add('hidden');
            }
            if (signupBtn) {
                signupBtn.classList.add('hidden');
            }
            if (logoutBtn) {
                logoutBtn.classList.remove('hidden');
            }
        } else {
            if (userGreeting) {
                userGreeting.classList.add('hidden');
            }
            if (createAdBtn) {
                createAdBtn.classList.add('hidden');
            }
            if (loginBtn) {
                loginBtn.classList.remove('hidden');
            }
            if (signupBtn) {
                signupBtn.classList.remove('hidden');
            }
            if (logoutBtn) {
                logoutBtn.classList.add('hidden');
            }
        }
    }

    logout() {
        if (confirm('¿Seguro que quieres cerrar la sesión?')) {
            AuthService.logout();
            window.location.href = 'index.html';
        }
    }
}

export default HeaderController;
