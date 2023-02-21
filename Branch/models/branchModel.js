const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema(
    {
        address: String,
        branch_products: [Object]
    },
    {
        collection: 'Branch',
        timestamps: true
    }
);

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;