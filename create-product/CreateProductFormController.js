import ProductService from '../shared/ProductService.js';
import AuthService from '../shared/AuthService.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';

class CreateProductFormController {
    constructor() {
        this.notificationView = new NotificationView();
        this.spinnerView = new SpinnerView();
        this.init();
    }

    init() {
        const formElement = document.getElementById('create-product-form');
        formElement.addEventListener('submit', async (event) => {
            event.preventDefault();

            this.spinnerView.showSpinner();

            const formData = new FormData(formElement);
            const imageUrl = formData.get('image-url');

            const newProduct = {
                title: formData.get('title'),
                description: formData.get('description'),
                price: parseFloat(formData.get('price')),
                type: formData.get('type'),
                image: imageUrl,
                category: formData.get('category'), // Añadimos la categoría
                userId: AuthService.decodeToken(AuthService.getToken()).userId
            };

            const token = AuthService.getToken();

            try {
                await ProductService.createProduct(newProduct, token);
                this.spinnerView.hideSpinner();
                this.notificationView.showSuccess('Producto creado con éxito');
                window.location.href = 'index.html';
            } catch (error) {
                this.spinnerView.hideSpinner();
                this.notificationView.showError(`Error al crear el producto: ${error.message}`);
            }
        });
    }
}

export default CreateProductFormController;