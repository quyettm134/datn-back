const express = require('express');
const voucherController = require('../controllers/voucherController');

const voucherRoutes = express.Router();

voucherRoutes.get('/', voucherController.getVouchers);
voucherRoutes.get('/:id', voucherController.getOneVoucher);
voucherRoutes.post('/', voucherController.createVoucher);
voucherRoutes.put('/:id', voucherController.updateVoucher);
voucherRoutes.delete('/:id', voucherController.deleteVoucher);

module.exports = voucherRoutes;