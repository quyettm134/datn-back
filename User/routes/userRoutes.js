const express = require('express');
const userController = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.get('/', userController.getUsers);
userRoutes.get('/:id', userController.getOneUser);
userRoutes.post('/', userController.createUser);
userRoutes.put('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.deleteUser);
userRoutes.get('/:id/cart', userController.getOneUserCart);
userRoutes.put('/:id/cart', userController.addItemToCart);
userRoutes.delete('/:id/cart', userController.deleteItemFromCart);
userRoutes.get('/:id/like_list', userController.getOneUserLikeList);
userRoutes.put('/:id/like_list', userController.addItemToLikeList);
userRoutes.delete('/:id/like_list', userController.deleteItemFromLikeList);

module.exports = userRoutes;