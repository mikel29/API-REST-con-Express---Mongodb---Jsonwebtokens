const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const register = async (req, res) => {
    try {
        const { username, password, full_name } = req.body;

        if (!username || !password || !full_name) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = new User({ username, password: hashedPassword, full_name });

        const savedUser = await newUser.save();

        console.log('Usuario guardado:', savedUser);

        const token = jwt.sign({ userId: savedUser._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ message: "Usuario registrado exitosamente", token });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};

const login = async (req, res) => {
    try {
        let password = req.body.password;
        let username = req.body.username;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: "Nombre de usuario no encontrado" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        console.log(`Sesión iniciada para el usuario: ${username}`);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};



const updateUser = async (req, res) => {
    try {
        const { full_name, password } = req.body;
        const updates = {};
        if (full_name) updates.full_name = full_name;
        if (password) updates.password = bcrypt.hashSync(password, 8);

        const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario actualizado correctamente", user });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Obtener el ID del parámetro de la URL
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado correctamente", deletedUser });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
};

const list = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);  // Aquí devolvemos los datos en formato JSON
    } catch (error) {
        console.error('Error al listar los usuarios:', error);
        res.status(500).json({ error: "Error al listar los usuarios" });
    }
};


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

const fetchUsers = async () => {
    try {
        const users = await User.find({}); // Busca todos los documentos en la colección User
        return users; // Devuelve los usuarios encontrados
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Propaga el error para manejarlo en la función de ruta o controlador
    }
};
module.exports = { register, login, updateUser, deleteUserById, list, getUserById, fetchUsers };
