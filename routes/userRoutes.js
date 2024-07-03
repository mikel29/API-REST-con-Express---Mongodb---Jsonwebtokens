const express = require('express');
const { register, login, updateUser, deleteUserById, list, getUserById, fetchUsers } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const router = express.Router();



router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/listUsers', (req, res) => {
    res.render('listUsers');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', register);
router.post('/login', auth, login);
router.get('/', auth, list);  // Ruta para listar todos los usuarios
router.get('/:id', auth, getUserById);  // Ruta para obtener un usuario por ID
router.put('/:id', auth, updateUser);
router.delete('/:id',deleteUserById);


module.exports = router;