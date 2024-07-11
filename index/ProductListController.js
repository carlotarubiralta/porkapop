// porkapop/index/ProductListController.js
import ProductService from '../shared/ProductService.js';
import NotificationView from '../shared/notification/notificationView.js';
import SpinnerView from '../shared/spinner/spinnerView.js';

class ProductListController {
    constructor() {
        this.notificationView = new NotificationView();
        this.spinnerView = new SpinnerView();
        this.page = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;
        this.perPage = 8;
        this.productIdsLoaded = new Set();
        this.noMoreProducts = false;
        this.categoryFilter = '';
        this.init();
    }

    async init() {
        console.log('Inicializando ProductListController');
        await this.loadProducts();

        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
        }

        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (event) => this.handleCategoryFilter(event));
        }
    }

    async loadProducts() {
        this.spinnerView.showSpinner();
        try {
            const products = await ProductService.getProducts(this.page, this.perPage, this.categoryFilter);
            console.log(`Productos cargados (Página ${this.page}):`, products);
            if (products.length === 0 && this.page === 1) {
                this.renderEmpty();
            } else {
                this.renderProducts(products);

                if (products.length < this.perPage) {
                    this.noMoreProducts = true;
                    this.hideLoadMoreButton();
                } else {
                    this.noMoreProducts = false;
                    this.showLoadMoreButton();
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
            this.updateURL();
            await this.loadProducts();
        }
    }

    updateURL() {
        const url = new URL(window.location);
        url.searchParams.set('page', this.page);
        window.history.pushState({}, '', url);
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
            productListElement.innerHTML = ''; // Limpiamos los resultados previos si es una nueva búsqueda
        }
        products.forEach(product => {
            if (!this.productIdsLoaded.has(product.id)) {
                this.productIdsLoaded.add(product.id);

                const productElement = document.createElement('a');
                productElement.className = 'product block';
                productElement.href = `productDetail.html?id=${product.id}`;
                productElement.innerHTML = `
                    <div class="border p-4 rounded shadow hover:shadow-md transition-shadow">
                        <img src="${product.image}" alt="${product.title}" class="w-full h-32 object-cover mb-4 rounded">
                        <h2 class="text-xl font-bold">${product.title}</h2>
                        <p>${product.description}</p>
                        <p class="font-bold">${product.price} €</p>
                        <p class="text-gray-500">${product.category}</p> <!-- Añadimos la categoría aquí -->
                        <p>${product.type}</p>
                    </div>
                `;
                productListElement.appendChild(productElement);
            }
        });
    }

    hideLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
        const noMoreProductsMsg = document.getElementById('no-more-products-msg');
        if (!noMoreProductsMsg) {
            const noMoreProductsElement = document.createElement('p');
            noMoreProductsElement.id = 'no-more-products-msg';
            noMoreProductsElement.className = 'text-gray-500 mt-4';
            noMoreProductsElement.textContent = 'No hay más productos.';
            loadMoreBtn.parentElement.appendChild(noMoreProductsElement);
        }
    }

    showLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'block';
        }
        const noMoreProductsMsg = document.getElementById('no-more-products-msg');
        if (noMoreProductsMsg) {
            noMoreProductsMsg.remove();
        }
    }

    handleCategoryFilter(event) {
        this.categoryFilter = event.target.value;
        this.page = 1;
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
