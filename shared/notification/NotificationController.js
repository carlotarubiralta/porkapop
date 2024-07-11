class NotificationView {
    constructor() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'fixed inset-0 flex items-center justify-center';
        this.notificationContainer.style.zIndex = '9999';
        document.body.appendChild(this.notificationContainer);
    }

    showSuccess(message) {
        this.showNotification(message, 'bg-green-500 text-white');
    }

    showError(message) {
        this.showNotification(message, 'bg-red-500 text-white');
    }

    showNotification(message, className) {
        this.clearNotifications();
        const notification = document.createElement('div');
        notification.className = `p-4 mb-4 rounded shadow-lg ${className}`;
        notification.textContent = message;
        notification.style.maxWidth = '80%';
        notification.style.textAlign = 'center';
        notification.style.position = 'relative';  // Added for positioning spinner

        this.notificationContainer.appendChild(notification);
    }

    clearNotifications() {
        this.notificationContainer.innerHTML = '';
    }
}

export default NotificationView;
