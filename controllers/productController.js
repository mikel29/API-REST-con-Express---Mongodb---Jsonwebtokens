const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newProduct = new Product({ name, description, price });
        await newProduct.save();
        res.status(201).json({ message: "Producto creado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar productos" });
    }
};

module.exports = { createProduct, getProducts };
