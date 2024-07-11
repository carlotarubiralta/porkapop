// porkapop/index/ProductListController.js
import ProductService from '../shared/ProductService.js';
import NotificationView from '../shared/notification/NotificationView.js';
import SpinnerView from '../shared/spinner/SpinnerView.js';

class ProductListController {
    constructor() {
        this.notificationView = new NotificationView();
        this.spinnerView = new SpinnerView();
        this.page = 1;
        this.perPage = 12;
        this.totalProductsLoaded = 0;
        this.productIdsLoaded = new Set();
        this.searchQuery = '';
        this.noMoreProducts = false;
        this.init();
    }

    async init() {
        await this.loadProducts();

        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
        }

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (event) => this.handleSearch(event));
        }
    }

    async loadProducts() {
        this.spinnerView.showSpinner();
        try {
            const products = await ProductService.getProducts(this.page, this.perPage, this.searchQuery);
            if (products.length === 0 && this.page === 1) {
                this.renderEmpty();
            } else {
                const newProducts = products.filter(product => !this.productIdsLoaded.has(product.id));
                newProducts.forEach(product => this.productIdsLoaded.add(product.id));
                this.totalProductsLoaded += newProducts.length;
                this.renderProducts(newProducts);

                if (newProducts.length < this.perPage || products.length < this.perPage) {
                    this.noMoreProducts = true;
                    this.hideLoadMoreButton();
                } else {
                    this.noMoreProducts = false;
                }
            }
            this.spinnerView.hideSpinner();
        } catch (error) {
            this.spinnerView.hideSpinner();
            this.notificationView.showError(error.message);
        }
    }

    async loadMoreProducts() {
        if (!this.noMoreProducts) {
            this.page++;
            await this.loadProducts();
        }
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
        if (this.page === 1) {
            productListElement.innerHTML = ''; // Clear previous results if it's a new search
        }
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
        const noMoreProductsMsg = document.getElementById('no-more-products-msg');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
            if (!noMoreProductsMsg) {
                const noMoreProductsElement = document.createElement('p');
                noMoreProductsElement.id = 'no-more-products-msg';
                noMoreProductsElement.className = 'text-gray-500 mt-4';
                noMoreProductsElement.textContent = 'No hay más productos.';
                loadMoreBtn.parentElement.appendChild(noMoreProductsElement);
            }
        }
    }

    handleSearch(event) {
        this.searchQuery = event.target.value;
        this.page = 1;
        this.totalProductsLoaded = 0;
        this.productIdsLoaded.clear();
        this.noMoreProducts = false; // Reset the flag for new searches
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'block'; // Reset the load more button
        }
        const noMoreProductsMsg = document.getElementById('no-more-products-msg');
        if (noMoreProductsMsg) {
            noMoreProductsMsg.remove(); // Remove any existing "no more products" message
        }
        this.loadProducts();
    }
}

export default ProductListController;