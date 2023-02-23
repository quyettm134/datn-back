const express = require('express');
const productController = require('../controllers/productController');

const productRoutes = express.Router();

productRoutes.get('/', productController.getProducts);
productRoutes.get('/:id', productController.getOneProduct);
productRoutes.post('/', productController.createProduct);
productRoutes.put('/:id', productController.updateProduct);
productRoutes.delete('/:id', productController.deleteProduct);

productRoutes.get('/style/:style', productController.getProductByStyle);
productRoutes.get('/target/:target', productController.getProductByTarget);
productRoutes.get('/type/:type', productController.getProductByType);
productRoutes.get('/season/:season', productController.getProductBySeason);
productRoutes.get('/price/:min/:max', productController.getProductByPrice);

module.exports = productRoutes;