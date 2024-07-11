// porkapop/shared/notification/NotificationController.js

class NotificationController {
    static showNotification(message, type = 'info') {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification ${type}`;
        notificationElement.innerText = message;
        
        document.body.appendChild(notificationElement);

        setTimeout(() => {
            notificationElement.remove();
        }, 3000);
    }

    static showError(message) {
        this.showNotification(message, 'error');
    }

    static showSuccess(message) {
        this.showNotification(message, 'success');
    }

    static showInfo(message) {
        this.showNotification(message, 'info');
    }
}

export default NotificationController;
