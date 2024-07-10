// porkapop/index/productView.js
export function renderLoading() {
    document.getElementById('product-list').innerHTML = '<p class="text-center text-gray-500">Cargando...</p>';
}

export function renderError(message) {
    document.getElementById('product-list').innerHTML = `<p class="text-center text-red-500">${message}</p>`;
}

export function renderProductList(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${products.map(product => `
                <div class="bg-white p-4 rounded shadow">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-32 object-cover mb-4 rounded">
                    <h2 class="text-xl font-bold mb-2">${product.title}</h2>
                    <p class="mb-2">${product.description}</p>
                    <p class="text-green-500 mb-2">${product.price} €</p>
                    <p class="text-sm text-gray-600">${product.type}</p>
                </div>
            `).join('')}
        </div>
    `;
}
