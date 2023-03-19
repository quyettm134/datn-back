const express = require('express');
const orderController = require('../controllers/orderController');
const { verifyTokenAndRole } = require('../middlewares/jwtAuth');

const orderRoutes = express.Router();

orderRoutes.get('/', orderController.getOrders);
orderRoutes.get('/details', orderController.getOneOrder);
orderRoutes.get('/order_list', verifyTokenAndRole(['customer']),orderController.getOneUserOrder);
orderRoutes.post('/', orderController.createOrder);
orderRoutes.put('/:id', orderController.updateOrder);
orderRoutes.delete('/:id', orderController.deleteOrder);

module.exports = orderRoutes;