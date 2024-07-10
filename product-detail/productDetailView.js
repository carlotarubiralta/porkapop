// porkapop/product-detail/productDetailView.js
export function renderLoading() {
    console.log('Rendering loading state...');
    document.getElementById('product-detail').innerHTML = '<p class="text-center text-gray-500">Cargando...</p>';
}

export function renderError(message) {
    console.error('Rendering error state:', message);
    document.getElementById('product-detail').innerHTML = `<p class="text-center text-red-500">${message}</p>`;
}

export function renderProductDetail(product, isOwner) {
    console.log('Rendering product detail:', product);
    document.getElementById('product-detail').innerHTML = `
        <div class="bg-white p-4 rounded shadow mb-4">
            <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover mb-4 rounded">
            <h2 class="text-xl font-bold mb-2">${product.title}</h2>
            <p class="mb-2">${product.description}</p>
            <p class="text-green-500 mb-2">${product.price} €</p>
            <p class="text-sm text-gray-600">${product.type}</p>
            ${isOwner ? `
                <button id="delete-ad-btn" class="hidden bg-red-500 text-white px-4 py-2 rounded">Eliminar Anuncio</button>
                <button id="edit-ad-btn" class="hidden bg-yellow-500 text-white px-4 py-2 rounded">Editar Anuncio</button>
            ` : ''}
        </div>
    `;
}

export function renderEditForm(product) {
    console.log('Rendering edit form for product:', product);
    document.getElementById('product-detail').innerHTML = `
        <form id="edit-product-form" class="bg-white p-4 rounded shadow">
            <div class="mb-4">
                <label for="title" class="block text-gray-700">Título</label>
                <input type="text" id="title" name="title" class="w-full p-2 border rounded" value="${product.title}">
            </div>
            <div class="mb-4">
                <label for="description" class="block text-gray-700">Descripción</label>
                <textarea id="description" name="description" class="w-full p-2 border rounded">${product.description}</textarea>
            </div>
            <div class="mb-4">
                <label for="price" class="block text-gray-700">Precio</label>
                <input type="number" id="price" name="price" class="w-full p-2 border rounded" value="${product.price}">
            </div>
            <div class="mb-4">
                <label for="type" class="block text-gray-700">Tipo</label>
                <select id="type" name="type" class="w-full p-2 border rounded">
                    <option value="venta" ${product.type === 'venta' ? 'selected' : ''}>En venta</option>
                    <option value="compra" ${product.type === 'compra' ? 'selected' : ''}>Busco</option>
                </select>
            </div>
            <div class="mb-4">
                <label for="image" class="block text-gray-700">Imagen</label>
                <input type="text" id="image" name="image" class="w-full p-2 border rounded" value="${product.image}">
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar Cambios</button>
        </form>
    `;
}
