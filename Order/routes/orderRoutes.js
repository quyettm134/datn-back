const express = require('express');
const orderController = require('../controllers/orderController');

const orderRoutes = express.Router();

orderRoutes.get('/', orderController.getOrders);
orderRoutes.get('/:id', orderController.getOneOrder);
orderRoutes.get('/:id/order_list', orderController.getOneUserOrder);
orderRoutes.post('/', orderController.createOrder);
orderRoutes.put('/:id', orderController.updateOrder);
orderRoutes.delete('/:id', orderController.deleteOrder);

module.exports = orderRoutes;