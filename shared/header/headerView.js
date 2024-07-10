// porkapop/shared/headerView.js
import AuthService from './AuthService.js';

export function updateHeader() {
    const token = AuthService.getToken();
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const userGreeting = document.getElementById('user-greeting');
    const logoutBtn = document.getElementById('logout-btn');
    const createAdBtn = document.getElementById('create-ad-btn');

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
