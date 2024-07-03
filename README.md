Este proyecto es una aplicación web desarrollada con Node.js, Express, y MongoDB. La aplicación incluye funcionalidades de gestión de usuarios y productos, con autenticación y autorización mediante JWT (JSON Web Tokens).

Funcionalidades
Conexión a MongoDB
Configuración de la conexión a una base de datos MongoDB utilizando Mongoose.
La URI de la base de datos se obtiene de las variables de entorno.
Modelos
Usuario (User): Modelo para representar a los usuarios en la base de datos.
Producto (Product): Modelo para representar a los productos en la base de datos.
Controladores
Productos:
Crear un producto (createProduct).
Obtener una lista de productos (getProducts).
Usuarios:
Registrar un nuevo usuario (register).
Iniciar sesión (login).
Actualizar un usuario (updateUser).
Eliminar un usuario (deleteUserById).
Listar todos los usuarios (list).
Obtener un usuario por ID (getUserById).
Rutas
Rutas de Productos:
Ruta protegida para crear productos.
Ruta pública para obtener productos.
Rutas de Usuarios:
Ruta para registrar usuarios.
Ruta para iniciar sesión.
Ruta para listar usuarios.
Ruta para obtener un usuario por ID.
Ruta para actualizar un usuario.
Ruta para eliminar un usuario.
Middleware de Autenticación
Middleware para proteger ciertas rutas que requieren autenticación del usuario.
Renderizado de Vistas
Configuración de EJS como motor de plantillas.
Renderizado de vistas de registro, inicio de sesión y listado de usuarios.
Solicitudes HTTP
Uso de Axios para realizar solicitudes HTTP en el servidor, por ejemplo, para obtener datos de una API externa.
Configuración del Servidor
Configuración y levantamiento de un servidor Express, escuchando en un puerto definido en las variables de entorno o por defecto en el puerto 3000.
