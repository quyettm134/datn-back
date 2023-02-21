const express = require('express');
const branchController = require('../controllers/branchController');

const branchRoutes = express.Router();

branchRoutes.get('/', branchController.getBranches);
branchRoutes.get('/:id', branchController.getOneBranch);
branchRoutes.post('/', branchController.createBranch);
branchRoutes.put('/:id', branchController.updateBranch);
branchRoutes.delete('/:id', branchController.deleteBranch);

module.exports = branchRoutes;