const express = require('express');
const orderController = require('../controllers/orderController');

const orderRoutes = express.Router();

orderRoutes.get('/', orderController.getOrders);
orderRoutes.get('/:id', orderController.getOneOrder);
orderRoutes.post('/', orderController.createOrder);
orderRoutes.put('/:id', orderController.updateOrder);
orderRoutes.delete('/:id', orderController.deleteOrder);

module.exports = orderRoutes;