const express = require('express');
const paymentController = require('../controllers/paymentController');

const paymentRoutes = express.Router();

paymentRoutes.get('/', paymentController.getPayments);
paymentRoutes.get('/:id', paymentController.getOnePayment);
paymentRoutes.post('/', paymentController.createPayment);
paymentRoutes.put('/:id', paymentController.updatePayment);
paymentRoutes.delete('/:id', paymentController.deletePayment);

module.exports = paymentRoutes;