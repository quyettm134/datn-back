const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        productId: String,
        customerId: String,
        content: String,
        time: Date,
        star: Number
    },
    {
        collection: 'Comment',
        timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;