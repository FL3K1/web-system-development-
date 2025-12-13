# Juanjo's Shop - Proyecto Final

Aplicación Full-Stack de comercio electrónico que permite a los usuarios ver productos, añadirlos al carrito y realizar pedidos. Incluye un panel de administración para gestionar el inventario (CRUD completo) con subida de múltiples imágenes.



TECNOLOGIAS USADAS

Frontend:
- React (Vite)
- React Router Dom (Navegación)
- Context API (Gestión de estado global del Carrito)
- Axios (Peticiones HTTP)
- CSS Modules / Modern CSS (Diseño Responsivo)

Backend:
- Node.js y Express (API REST)
- PostgreSQL (Base de Datos Relacional)
- Multer (Subida de imágenes)
- JWT y Bcrypt (Seguridad y Autenticación)



INSTALACION Y CONFIGURACION

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

1. Clonar el repositorio
   git clone <URL_DE_TU_REPO>
   cd Project

2. Configurar la Base de Datos (PostgreSQL)
   Abre tu gestor de SQL y crea una base de datos llamada "tienda_ropa".
   Luego ejecuta el siguiente script para crear las tablas:

   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(255) UNIQUE NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       role VARCHAR(50) DEFAULT 'client'
   );

   CREATE TABLE products (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       price NUMERIC(10, 2) NOT NULL,
       description TEXT,
       stock INTEGER NOT NULL
   );

   CREATE TABLE product_images (
       id SERIAL PRIMARY KEY,
       product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
       image_url TEXT NOT NULL
   );

3. Configurar el Backend (Servidor)
   Ve a la carpeta del servidor e instala las dependencias:
   cd server
   npm install

   Crea un archivo llamado ".env" en la carpeta server con estos datos:
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=tienda_ropa
   JWT_SECRET=tu_palabra_secreta

   Inicia el servidor:
   npm start

4. Configurar el Frontend (Cliente)
   Abre una nueva terminal, ve a la carpeta del cliente e instala dependencias:
   cd client
   npm install

   Inicia la aplicación:
   npm run dev



FUNCIONALIDADES PRINCIPALES

- Autenticación: Login y Registro con encriptación.
- Roles: Diferenciación entre Admin y Cliente.
- Carrito Inteligente: Calcula stock en tiempo real y no se borra al recargar.
- Gestión de Productos (Solo Admin): Crear, Editar y Eliminar productos con múltiples fotos.
- UX/UI: Diseño moderno y notificaciones emergentes.



CREDENCIALES DE PRUEBA (ADMIN)

Para probar las funcionalidades de administrador, usa este usuario (asegúrate de tenerlo en la base de datos con rol 'admin'):

Email: juanjo@gmail.com
Contraseña: 1234


Juan José Sánchez Ortega
Desarrollo de Sistemas Web