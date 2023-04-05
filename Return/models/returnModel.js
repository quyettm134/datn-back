const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId },
        product: Object,
        status: String,
        reason: String
    },
    {
        collection: 'Return',
        timestamps: true
    }
);

const Return = mongoose.model('Return', returnSchema);

module.exports = Return;