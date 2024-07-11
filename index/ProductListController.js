import ProductService from '../shared/ProductService.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';

class ProductListController {
    constructor() {
        this.notificationView = new NotificationView();
        this.spinnerView = new SpinnerView();
        this.page = 1;
        this.perPage = 8; // Cambiado a 12 por tu configuración
        this.totalProductsLoaded = 0;
        this.productIdsLoaded = new Set(); // Mantener un seguimiento de los IDs de productos cargados
        this.init();
    }

    async init() {
        await this.loadProducts();

        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
        } else {
            console.error('load-more-btn element not found in the DOM.');
        }
    }

    async loadProducts() {
        this.spinnerView.showSpinner();
        try {
            const products = await ProductService.getProducts(this.page, this.perPage);
            if (products.length === 0 && this.page === 1) {
                this.renderEmpty();
            } else {
                const newProducts = products.filter(product => !this.productIdsLoaded.has(product.id));
                newProducts.forEach(product => this.productIdsLoaded.add(product.id));
                this.totalProductsLoaded += newProducts.length;
                this.renderProducts(newProducts);

                // Si el número de productos cargados es menor que el número por página, significa que no hay más productos para cargar
                if (newProducts.length < this.perPage) {
                    this.hideLoadMoreButton();
                }
            }
            this.spinnerView.hideSpinner();
        } catch (error) {
            this.spinnerView.hideSpinner();
            this.notificationView.showError(error.message);
        }
    }

    async loadMoreProducts() {
        this.page++;
        await this.loadProducts();
    }

    renderLoading() {
        const productListElement = document.getElementById('product-list');
        productListElement.innerHTML = `<p class="text-gray-500">Cargando...</p>`;
    }

    renderEmpty() {
        const productListElement = document.getElementById('product-list');
        productListElement.innerHTML = `<p class="text-gray-500">No hay anuncios disponibles.</p>`;
    }

    renderProducts(products) {
        const productListElement = document.getElementById('product-list');
        products.forEach(product => {
            const productElement = document.createElement('a');
            productElement.className = 'product block';
            productElement.href = `productDetail.html?id=${product.id}`;
            productElement.innerHTML = `
                <div class="border p-4 rounded shadow hover:shadow-md transition-shadow">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-32 object-cover mb-4 rounded">
                    <h2 class="text-xl font-bold">${product.title}</h2>
                    <p>${product.description}</p>
                    <p class="font-bold">${product.price} €</p>
                    <p>${product.type}</p>
                </div>
            `;
            productListElement.appendChild(productElement);
        });
    }

    hideLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
            const noMoreProductsMsg = document.createElement('p');
            noMoreProductsMsg.className = 'text-gray-500 mt-4';
            noMoreProductsMsg.textContent = 'No hay más productos.';
            loadMoreBtn.parentElement.appendChild(noMoreProductsMsg);
        }
    }
}

export default ProductListController;