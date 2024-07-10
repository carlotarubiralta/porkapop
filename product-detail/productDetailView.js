// porkapop/product-detail/productDetailView.js
export function renderLoading() {
    document.getElementById('product-detail').innerHTML = '<p class="text-center text-gray-500">Cargando...</p>';
}

export function renderError(message) {
    document.getElementById('product-detail').innerHTML = `<p class="text-center text-red-500">${message}</p>`;
}

export function renderProductDetail(product) {
    document.getElementById('product-detail').innerHTML = `
        <div class="bg-white p-4 rounded shadow mb-4">
            <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover mb-4 rounded">
            <h2 class="text-xl font-bold mb-2">${product.title}</h2>
            <p class="mb-2">${product.description}</p>
            <p class="text-green-500 mb-2">${product.price} €</p>
            <p class="text-sm text-gray-600">${product.type}</p>
        </div>
    `;
}
