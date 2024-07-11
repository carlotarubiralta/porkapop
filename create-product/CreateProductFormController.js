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
        if (!formElement) {
            console.error("Form element not found");
            return;
        }

        formElement.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log("Form submitted");  // Verificar que se está enviando el formulario

            this.spinnerView.showSpinner();

            const formData = new FormData(formElement);
            const imageUrl = formData.get('image-url');

            const newProduct = {
                title: formData.get('title'),
                description: formData.get('description'),
                price: parseFloat(formData.get('price')),
                type: formData.get('type'),
                image: imageUrl,
                category: formData.get('category'),
                userId: AuthService.decodeToken(AuthService.getToken()).userId
            };

            console.log("Product Data to Create:", newProduct);  // Verificar los datos antes de enviarlos

            const token = AuthService.getToken();

            try {
                await ProductService.createProduct(newProduct, token);
                this.notificationView.showSuccess('Producto creado con éxito. Redirigiendo a la lista de productos...');
                
                // Esperar 3 segundos antes de redirigir
                setTimeout(() => {
                    this.spinnerView.hideSpinner();
                    window.location.href = 'index.html';
                }, 3000);

            } catch (error) {
                this.spinnerView.hideSpinner();
                this.notificationView.showError(`Error al crear el producto: ${error.message}`);
            }
        });
    }
}

export default CreateProductFormController;
