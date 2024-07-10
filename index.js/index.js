document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    // Otras inicializaciones
});

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('login-link').classList.add('hidden');
        document.getElementById('signup-link').classList.add('hidden');
        document.getElementById('user-greeting').classList.remove('hidden');
        document.getElementById('logout-button').classList.remove('hidden');
        document.getElementById('user-name').textContent = localStorage.getItem('username');
    } else {
        document.getElementById('login-link').classList.remove('hidden');
        document.getElementById('signup-link').classList.remove('hidden');
        document.getElementById('user-greeting').classList.add('hidden');
        document.getElementById('logout-button').classList.add('hidden');
    }
}

document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    checkAuthStatus();
    window.location.href = 'index.html';
});
