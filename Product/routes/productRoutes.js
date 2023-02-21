const express = require('express');
const productController = require('../controllers/productController');

const productRoutes = express.Router();

productRoutes.get('/', productController.getProducts);
productRoutes.get('/:id', productController.getOneProduct);
productRoutes.post('/', productController.createProduct);
productRoutes.put('/:id', productController.updateProduct);
productRoutes.delete('/:id', productController.deleteProduct);

module.exports = productRoutes;