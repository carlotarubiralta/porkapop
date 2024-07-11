// porkapop/product-detail/productDetailView.js

export const renderProductDetail = (product, isOwner) => {
    const productDetailElement = document.getElementById('product-detail');
    productDetailElement.innerHTML = `
        <img src="${product.image}" alt="${product.title} foto" class="w-full h-64 object-cover mb-4 rounded">
        <h1 class="text-2xl font-bold mb-2">${product.title}</h1>
        <p class="mb-2">${product.description}</p>
        <p class="mb-2">${product.price} €</p>
        <p class="mb-2">${product.type}</p>
        ${isOwner ? `
            <button id="edit-ad-btn" class="bg-blue-500 text-white px-4 py-2 rounded">Editar Anuncio</button>
            <button id="delete-ad-btn" class="bg-red-500 text-white px-4 py-2 rounded hidden">Eliminar Anuncio</button>
        ` : ''}
    `;
};

export const renderEditForm = (product) => {
    const productDetailElement = document.getElementById('product-detail');
    productDetailElement.innerHTML = `
        <form id="edit-product-form">
            <div class="mb-4">
                <label for="title" class="block text-gray-700">Título</label>
                <input type="text" id="title" name="title" class="w-full p-2 border rounded" value="${product.title}" required>
            </div>
            <div class="mb-4">
                <label for="description" class="block text-gray-700">Descripción</label>
                <input type="text" id="description" name="description" class="w-full p-2 border rounded" value="${product.description}" required>
            </div>
            <div class="mb-4">
                <label for="price" class="block text-gray-700">Precio</label>
                <input type="number" id="price" name="price" class="w-full p-2 border rounded" value="${product.price}" required>
            </div>
            <div class="mb-4">
                <label for="type" class="block text-gray-700">Tipo</label>
                <select id="type" name="type" class="w-full p-2 border rounded" required>
                    <option value="venta" ${product.type === 'venta' ? 'selected' : ''}>Venta</option>
                    <option value="compra" ${product.type === 'compra' ? 'selected' : ''}>Compra</option>
                </select>
            </div>
            <div class="mb-4">
                <label for="image-url" class="block text-gray-700">URL de la Imagen</label>
                <input type="url" id="image-url" name="image-url" class="w-full p-2 border rounded" value="${product.image}">
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar Cambios</button>
        </form>
    `;
};

export const renderError = (message) => {
    const productDetailElement = document.getElementById('product-detail');
    productDetailElement.innerHTML = `<p class="text-red-500">${message}</p>`;
};

export const renderLoading = () => {
    const productDetailElement = document.getElementById('product-detail');
    productDetailElement.innerHTML = `<p class="text-gray-500">Cargando...</p>`;
};
