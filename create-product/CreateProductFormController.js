// porkapop/create-product/CreateProductFormController.js
import ProductService from '../shared/ProductService.js';
import AuthService from '../shared/AuthService.js';

class CreateProductFormController {
    constructor() {
        this.init();
    }

    init() {
        const formElement = document.getElementById('create-product-form');
        formElement.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(formElement);
            const newProduct = {
                title: formData.get('title'),
                description: formData.get('description'),
                price: parseFloat(formData.get('price')),
                type: formData.get('type'),
                image: formData.get('image') // Asegúrate de que esto sea una URL
            };

            const token = AuthService.getToken();

            try {
                await ProductService.createProduct(newProduct, token);
                alert('Producto creado con éxito');
                window.location.href = 'index.html';
            } catch (error) {
                alert(`Error al crear el producto: ${error.message}`);
            }
        });
    }
}

export default CreateProductFormController;
