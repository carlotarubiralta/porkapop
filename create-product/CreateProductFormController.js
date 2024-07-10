// porkapop/create-product/CreateProductFormController.js
import ProductService from '../shared/ProductService.js';
import AuthService from '../shared/AuthService.js';

class CreateProductFormController {
    constructor(formElement) {
        this.formElement = formElement;
        this.addEventListeners();
    }

    addEventListeners() {
        this.formElement.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(this.formElement);
            const product = {
                title: formData.get('title'),
                description: formData.get('description'),
                price: formData.get('price'),
                type: formData.get('type'),
                image: formData.get('image')
            };

            try {
                const token = AuthService.getToken();
                if (!token) {
                    alert('Debes iniciar sesión para crear un anuncio');
                    window.location.href = 'login.html';
                    return;
                }

                await ProductService.createProduct(product, token);
                alert('Anuncio creado con éxito');
                window.location.href = 'index.html';
            } catch (error) {
                alert(`Error al crear el anuncio: ${error.message}`);
            }
        });
    }
}

export default CreateProductFormController;
