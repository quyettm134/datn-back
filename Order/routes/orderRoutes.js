const express = require('express');
const orderController = require('../controllers/orderController');
const { verifyTokenAndRole } = require('../middlewares/jwtAuth');

const orderRoutes = express.Router();

orderRoutes.get('/', orderController.getOrders);
orderRoutes.get('/order_details/:id', orderController.getOneOrder);
orderRoutes.get('/order_list', verifyTokenAndRole(['customer']), orderController.getOneUserOrder);
orderRoutes.post('/', verifyTokenAndRole(['customer']), orderController.createOrder);
orderRoutes.put('/:id', orderController.updateOrder);
orderRoutes.delete('/:id', orderController.deleteOrder);

module.exports = orderRoutes;