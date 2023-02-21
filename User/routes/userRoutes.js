const express = require('express');
const userController = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.get('/', userController.getUsers);
userRoutes.get('/:id', userController.getOneUser);
userRoutes.post('/', userController.createUser);
userRoutes.put('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.deleteUser);

module.exports = userRoutes;