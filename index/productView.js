// productView.js
export function renderProductList(products) {
    const productListElement = document.getElementById('product-list');
    productListElement.innerHTML = products.map(product => `
        <div class="bg-white shadow-md rounded p-4">
            <a href="productDetail.html?id=${product.id}" class="block">
                <img src="${product.image}" alt="${product.title}" class="w-full h-32 object-cover mb-4">
                <h2 class="text-lg font-bold mb-2">${product.title}</h2>
                <p class="text-gray-700 mb-2">${product.description}</p>
                <p class="text-blue-500 font-semibold mb-2">${product.price} €</p>
                <p class="text-sm text-gray-600">${product.type === 'venta' ? 'En venta' : 'Busco'}</p>
            </a>
        </div>
    `).join('');
}

export function renderLoading() {
    const productListElement = document.getElementById('product-list');
    productListElement.innerHTML = `<p class="text-gray-500">Cargando anuncios...</p>`;
}

export function renderError(errorMessage) {
    const productListElement = document.getElementById('product-list');
    productListElement.innerHTML = `<p class="text-red-500">Error al cargar los anuncios: ${errorMessage}</p>`;
}
