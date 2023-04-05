const express = require('express');
const returnController = require('../controllers/returnController');
const { verifyTokenAndRole } = require('../middlewares/jwtAuth');

const returnRoutes = express.Router();

returnRoutes.get('/', verifyTokenAndRole(['admin']), returnController.getReturnReqs);
returnRoutes.get('/request_list', verifyTokenAndRole(['customer']), returnController.getOneUserReturnReq);
returnRoutes.post('/', verifyTokenAndRole(['customer']), returnController.createReturnRequest);
returnRoutes.put('/:id', verifyTokenAndRole(['admin']), returnController.updateReturnRequest);

module.exports = returnRoutes;