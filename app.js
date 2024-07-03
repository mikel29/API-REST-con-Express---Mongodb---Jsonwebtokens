require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./archivo/db'); // Asegúrate de importar y usar correctamente tu conexión a la base de datos
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const axios = require('axios'); // Importa Axios
const auth = require('./middlewares/auth'); // Importa el middleware de autenticación

const app = express();

// Conectar a la base de datos
connectDB();

// Configurar motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());

// Ruta para listar usuarios
app.get('/listUsers', async (req, res) => {
    try {
        const users = await fetchUsers();
        res.render('listUsers', { users }); // Renderiza la vista 'listUsers' pasando los usuarios como datos
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

// Ruta protegida para obtener el perfil del usuario
app.get('/profile', auth, (req, res) => {
    res.json({ message: `Usuario autenticado con userId: ${req.userId}` });
});

app.use('/api/users', userRoutes);
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Ejemplo de solicitud GET usando Axios
app.get('/example', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log(response.data); // Imprime los datos recibidos en la consola
        res.json(response.data); // Envía los datos como respuesta JSON
    } catch (error) {
        console.error('Error en la solicitud GET:', error);
        res.status(500).json({ error: "Error en la solicitud GET" });
    }
});
