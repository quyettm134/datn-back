const express = require('express');
const commentController = require('../controllers/commentController');

const commentRoutes = express.Router();

commentRoutes.get('/', commentController.getComments);
commentRoutes.get('/:id', commentController.getOneComment);
commentRoutes.post('/', commentController.createComment);
commentRoutes.put('/:id', commentController.updateComment);
commentRoutes.delete('/:id', commentController.deleteComment);

module.exports = commentRoutes;