// porkapop/product-detail/productDetailView.js

export function renderProductDetail(product, isOwner) {
    const productDetailElement = document.getElementById('product-detail');
    productDetailElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p class="price">${product.price} €</p>
            <p class="type">${product.type}</p>
        </div>
        ${isOwner ? `
        <div class="actions">
            <button id="edit-ad-btn" class="edit-btn">Editar</button>
            <button id="delete-ad-btn" class="delete-btn">Eliminar</button>
        </div>` : ''}
    `;
}

export function renderEditForm(product) {
    const productDetailElement = document.getElementById('product-detail');
    productDetailElement.innerHTML = `
        <form id="edit-product-form" class="space-y-4">
            <div>
                <label for="title" class="block text-gray-700">Título</label>
                <input type="text" id="title" name="title" value="${product.title}" class="mt-1 block w-full border rounded p-2">
            </div>
            <div>
                <label for="description" class="block text-gray-700">Descripción</label>
                <textarea id="description" name="description" class="mt-1 block w-full border rounded p-2">${product.description}</textarea>
            </div>
            <div>
                <label for="price" class="block text-gray-700">Precio</label>
                <input type="number" id="price" name="price" value="${product.price}" class="mt-1 block w-full border rounded p-2">
            </div>
            <div>
                <label for="type" class="block text-gray-700">Tipo</label>
                <select id="type" name="type" class="mt-1 block w-full border rounded p-2">
                    <option value="venta" ${product.type === 'venta' ? 'selected' : ''}>Venta</option>
                    <option value="compra" ${product.type === 'compra' ? 'selected' : ''}>Compra</option>
                </select>
            </div>
            <div>
                <label for="image-url" class="block text-gray-700">URL de la imagen</label>
                <input type="text" id="image-url" name="image-url" value="${product.image}" class="mt-1 block w-full border rounded p-2">
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar Cambios</button>
        </form>
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
