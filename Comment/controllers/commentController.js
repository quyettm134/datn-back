const mongoose = require('mongoose');
const Comment = require('../models/commentModel');

const commentController = {
    getComments: async (req, res) => {
        try {
            const Comments = await Comment.find();
    
            res.status(200).json({
                success: true,
                data: {
                    Comments: Comments
                }
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: "Get comments failed",
                error: error
            });
        }
    },

    getOneComment: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No comment with that ID was found"
            });

        else {
            const thisComment = await Comment.findById(_id);
    
            res.json({
                success: true,
                data: {
                    Comment: thisComment
                }
            });
        }
    },

    createComment: async (req, res) => {
        const comment = req.body;
    
        const newComment = new Comment(comment);
    
        try {
            await newComment.save();
    
            res.status(200).json({
                success: true,
                data: {
                    Comment: newComment
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create comment failed",
                error: error
            });
        }
    },

    updateComment: async (req, res) => {
        const { id: _id } = req.params;

        const comment = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No comment with that ID was found"
            });

        else {
            const updatedComment = await Comment.findByIdAndUpdate(
                _id,
                { ...comment, _id },
                { new: true }
            );
    
            res.json({
                success: true,
                data: {
                    updatedComment: updatedComment
                }
            });
        }
    },

    deleteComment: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No comment with that ID was found"
            });

        else {
            await Comment.findByIdAndDelete(_id);

            res.json({
                success: true,
                message: "Comment successfully deleted"
            });
        }
    }
}

module.exports = commentController;