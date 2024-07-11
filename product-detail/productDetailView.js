export function renderProductDetail(product) {
    const productDetailElement = document.getElementById('product-detail');
    productDetailElement.innerHTML = `
        <h1 class="text-2xl font-bold mb-4">${product.title}</h1>
        <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover mb-4">
        <p class="text-lg">${product.description}</p>
        <p class="text-xl font-bold">${product.price} €</p>
        <p class="text-gray-500">${product.category}</p>
        <p class="text-gray-500">${product.type}</p>
    `;
}

export function renderLoading() {
    const productDetailElement = document.getElementById('product-detail');
    productDetailElement.innerHTML = `<p class="text-gray-500">Cargando...</p>`;
}

export function renderError(message) {
    const productDetailElement = document.getElementById('product-detail');
    productDetailElement.innerHTML = `<p class="text-red-500">${message}</p>`;
}
