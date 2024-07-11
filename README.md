# Porkapop

Porkapop es una aplicación de anuncios clasificados similar a Wallapop, desarrollada utilizando tecnologías web modernas sin el uso de frameworks de JavaScript. Esta aplicación permite a los usuarios crear, ver, editar y eliminar anuncios, así como buscar y filtrar anuncios por categorías. La autenticación de usuarios se maneja mediante JSON Web Tokens (JWT).

## Características

- **Listado de Anuncios:**
  - Muestra la imagen, nombre, descripción, precio y tipo (compra o venta) de cada anuncio.
  - Gestión de estados de interfaz: vacío, error, carga y éxito.
  - Navegación a la pantalla de detalle de cada anuncio.
  - Botón para crear un anuncio visible solo para usuarios autenticados.

- **Detalle de Anuncio:**
  - Muestra la foto, nombre, descripción, precio y tipo del anuncio.
  - Gestión de estados de interfaz: vacío, error, carga y éxito.
  - Botón para eliminar y editar anuncio si el usuario es el propietario.

- **Creación de Anuncio:**
  - Formulario para subir una foto, nombre, descripción, precio y tipo de anuncio.
  - Gestión de estados de interfaz: error, carga y éxito.
  - Solo accesible para usuarios autenticados.

- **Login y Registro:**
  - Formularios para login y registro de usuarios.
  - Autenticación mediante JWT.
  - Gestión de estados de interfaz: carga, error y éxito.

- **Paginación y Búsqueda:**
  - Paginación de anuncios con botón "Cargar más".
  - Búsqueda de anuncios por título y descripción.
  - Filtrado de anuncios por categorías.

## Requisitos

- Node.js y npm instalados.
- Sparrest.js (basado en json-server) para simular el backend.

## Instalación

1. Clonar el repositorio de sparrest.js:

    ```bash
    git clone https://github.com/kasappeal/sparrest.js
    cd sparrest.js
    npm install
    npm start
    ```

   El servidor se ejecutará en http://127.0.0.1:8000.

2. Clonar este repositorio y navegar a la carpeta del proyecto:

    ```bash
    git clone https://github.com/tu-usuario/porkapop.git
    cd porkapop
    ```

3. Instalar las dependencias de desarrollo:

    ```bash
    npm install
    ```

## Uso

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npx live-server
```

Esto abrirá tu aplicación en http://127.0.0.1:8080.

Asegúrate de que el servidor de sparrest.js esté en funcionamiento para manejar las solicitudes API.

## Estrctura del proyecto

```
└── 📁porkapop
    └── .DS_Store
    └── .gitignore
    └── README.md
    └── 📁create-product
        └── CreateProductFormController.js
        └── CreateProductPageController.js
        └── create-product.js
    └── createProduct.html
    └── 📁edit-product
        └── EditProductController.js
        └── edit-product.js
        └── editProductView.js
    └── editProduct.html
    └── 📁index
        └── IndexPageController.js
        └── ProductListController.js
        └── index.js
        └── product-list.css
        └── productView.js
    └── index.html
    └── 📁login
        └── LoginController.js
        └── LoginPageController.js
        └── login.js
    └── login.html
    └── logo-porkapop.png
    └── output.css
    └── package-lock.json
    └── package.json
    └── 📁product-detail
        └── ProductDetailController.js
        └── ProductDetailPageController.js
        └── product-detail.css
        └── product-detail.js
        └── productDetailView.js
    └── productDetail.html
    └── 📁public
        └── bici-montana.jpg
        └── iphone11.jpg
        └── logo-porkapop.png
        └── monitor.jpg
    └── 📁shared
        └── .DS_Store
        └── ApiService.js
        └── AuthService.js
        └── LocalStorageService.js
        └── PageController.js
        └── ProductService.js
        └── PubSub.js
        └── 📁header
            └── HeaderController.js
            └── header.css
            └── headerView.js
        └── 📁notification
            └── NotificationController.js
            └── notification.css
            └── notificationView.js
        └── 📁spinner
            └── SpinnerController.js
            └── spinner.css
            └── spinnerView.js
    └── 📁signup
        └── SignupController.js
        └── SignupPageController.js
        └── signup.js
    └── signup.html
    └── style.css
    └── tailwind.config.js
    └── 📁utils
        └── decodeJwtToken.js
```

## Contribuir

Haz un fork del proyecto.
Crea una rama para tu nueva función (git checkout -b feature/nueva-funcion).
Realiza tus cambios y haz un commit (git commit -am 'Añadir nueva función').
Empuja tu rama (git push origin feature/nueva-funcion).
Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Mira el archivo LICENSE para más detalles.
