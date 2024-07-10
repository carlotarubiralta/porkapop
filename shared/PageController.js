// porkapop/shared/PageController.js
import AuthService from './AuthService.js';

class PageController {
    constructor() {
        this.init();
    }

    init() {
        this.checkAuthState();
        this.bindEvents();
    }

    checkAuthState() {
        const token = AuthService.getToken();
        const isLoggedIn = !!token;

        const logoutBtn = document.getElementById('logout-btn');
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const userGreeting = document.getElementById('user-greeting');
        const createAdBtn = document.getElementById('create-ad-btn');

        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'inline' : 'none';
        if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'inline';
        if (signupBtn) signupBtn.style.display = isLoggedIn ? 'none' : 'inline';
        if (userGreeting) {
            userGreeting.style.display = isLoggedIn ? 'inline' : 'none';
            if (isLoggedIn) {
                const userName = 'usuario'; // Puedes obtener el nombre del usuario del token si está disponible
                userGreeting.innerText = `Hola, ${userName}!`;
            }
        }
        if (createAdBtn) createAdBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
    }

    bindEvents() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                AuthService.logout();
                window.location.reload();
            });
        }
    }
}

export default PageController;
