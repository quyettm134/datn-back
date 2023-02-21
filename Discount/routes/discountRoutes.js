const express = require('express');
const discountController = require('../controllers/discountController');

const discountRoutes = express.Router();

discountRoutes.get('/', discountController.getDiscounts);
discountRoutes.get('/:id', discountController.getOneDiscount);
discountRoutes.post('/', discountController.createDiscount);
discountRoutes.put('/:id', discountController.updateDiscount);
discountRoutes.delete('/:id', discountController.deleteDiscount);

module.exports = discountRoutes;