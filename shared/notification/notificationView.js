class NotificationView {
    constructor() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'fixed inset-0 flex items-center justify-center';
        this.notificationContainer.style.zIndex = '9999';
        this.notificationContainer.style.pointerEvents = 'none'; // Ensure it doesn't block other interactions
        document.body.appendChild(this.notificationContainer);
        console.log("Notification container added to DOM");
    }

    showSuccess(message) {
        console.log("showSuccess called with message:", message);
        this.showNotification(message, 'bg-green-500 text-white');
    }

    showError(message) {
        console.log("showError called with message:", message);
        this.showNotification(message, 'bg-red-500 text-white');
    }

    showNotification(message, className) {
        console.log("showNotification called with message:", message, "and className:", className);
        this.clearNotifications();
        const notification = document.createElement('div');
        notification.className = `p-4 mb-4 rounded shadow-lg ${className}`;
        notification.textContent = message;
        notification.style.maxWidth = '80%';
        notification.style.textAlign = 'center';
        notification.style.position = 'relative';

        this.notificationContainer.appendChild(notification);
        console.log("Notification appended to container:", notification);

        setTimeout(() => {
            notification.remove();
            console.log("Notification removed");
        }, 3000);
    }

    clearNotifications() {
        this.notificationContainer.innerHTML = '';
        console.log("Notifications cleared");
    }
}

export default NotificationView;
