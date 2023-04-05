const express = require('express');
const userController = require('../controllers/userController');
const { verifyTokenAndRole } = require('../middlewares/jwtAuth');

const userRoutes = express.Router();

userRoutes.get('/', verifyTokenAndRole(['admin']), userController.getUsers);
userRoutes.get('/profile', verifyTokenAndRole(['customer', 'admin', 'staff']), userController.getOneUser);
userRoutes.post('/register', userController.createUser);
userRoutes.post('/login', userController.userLogin);
userRoutes.put('/update', verifyTokenAndRole(['customer', 'admin', 'staff']), userController.updateUser);
userRoutes.delete('/:id', verifyTokenAndRole(['admin']), userController.deleteUser);
userRoutes.get('/like_list', verifyTokenAndRole(['customer']), userController.getOneUserLikeList);
userRoutes.put('/like_list/add', verifyTokenAndRole(['customer']), userController.addItemToLikeList);
userRoutes.delete('/like_list/delete', verifyTokenAndRole(['customer']), userController.deleteItemFromLikeList);

module.exports = userRoutes;