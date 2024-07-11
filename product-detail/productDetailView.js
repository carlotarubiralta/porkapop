export function renderProductDetail(product) {
    const productDetailElement = document.getElementById('product-detail');
    productDetailElement.innerHTML = `
        <div class="border p-4 rounded shadow">
            <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover mb-4 rounded">
            <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
            <p class="text-gray-700 mb-2">${product.description}</p>
            <p class="font-bold text-lg mb-2">${product.price} €</p>
            <p class="text-gray-500 mb-2">${product.category}</p>
            <p class="text-gray-500">${product.type}</p>
        </div>
    `;
}

export function renderEditForm(product) {
    const editFormElement = document.getElementById('edit-product-form');
    editFormElement.innerHTML = `
        <form id="update-product-form" class="space-y-4">
            <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
                <input type="text" id="title" name="title" value="${product.title}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            </div>
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea id="description" name="description" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">${product.description}</textarea>
            </div>
            <div>
                <label for="price" class="block text-sm font-medium text-gray-700">Precio</label>
                <input type="number" id="price" name="price" value="${product.price}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            </div>
            <div>
                <label for="type" class="block text-sm font-medium text-gray-700">Tipo</label>
                <select id="type" name="type" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                    <option value="venta" ${product.type === 'venta' ? 'selected' : ''}>Venta</option>
                    <option value="compra" ${product.type === 'compra' ? 'selected' : ''}>Compra</option>
                </select>
            </div>
            <div>
                <label for="category" class="block text-sm font-medium text-gray-700">Categoría</label>
                <select id="category" name="category" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                    <option value="deportes" ${product.category === 'deportes' ? 'selected' : ''}>Deportes</option>
                    <option value="tecnologia" ${product.category === 'tecnologia' ? 'selected' : ''}>Tecnología</option>
                    <option value="hogar" ${product.category === 'hogar' ? 'selected' : ''}>Hogar</option>
                    <option value="moda" ${product.category === 'moda' ? 'selected' : ''}>Moda</option>
                </select>
            </div>
            <button type="submit" class="mt-4 p-2 bg-green-500 text-white rounded">Guardar cambios</button>
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
