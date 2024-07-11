export function renderEditForm(product) {
    const editFormElement = document.getElementById('edit-product-form');
    if (editFormElement) {
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
                <div>
                    <label for="image-url" class="block text-sm font-medium text-gray-700">URL de la Imagen</label>
                    <input type="text" id="image-url" name="image-url" value="${product.image}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                </div>
                <button type="submit" class="mt-4 p-2 bg-green-500 text-white rounded">Guardar cambios</button>
            </form>
        `;
    } else {
        console.error("El elemento 'edit-product-form' no se encontró en el DOM.");
    }
}

export function renderError(message) {
    const editFormElement = document.getElementById('edit-product-form');
    editFormElement.innerHTML = `<p class="text-red-500">${message}</p>`;
}
