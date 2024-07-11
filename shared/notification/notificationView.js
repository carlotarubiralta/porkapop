// porkapop/shared/notification/NotificationView.js

class NotificationView {
    constructor() {
        this.notificationElement = document.createElement('div');
        this.notificationElement.className = 'notification hidden';
        document.body.appendChild(this.notificationElement);
    }

    showNotification(message, type = 'info') {
        this.notificationElement.className = `notification ${type}`;
        this.notificationElement.innerText = message;
        this.notificationElement.classList.remove('hidden');

        setTimeout(() => {
            this.notificationElement.classList.add('hidden');
        }, 3000);
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showInfo(message) {
        this.showNotification(message, 'info');
    }
}

export default NotificationView;
