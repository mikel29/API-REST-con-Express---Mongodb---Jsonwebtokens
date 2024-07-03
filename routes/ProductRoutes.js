const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');

// Ruta protegida para crear un nuevo producto
router.post('/products', auth, productController.createProduct);

// Ruta pública para obtener todos los productos
router.get('/products', productController.getProducts);

module.exports = router;
