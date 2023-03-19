const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema(
    {
        start_date: Date,
        end_date: Date,
        employeeId: String,
        type: String,
        value: Number
    },
    {
        collection: 'Discount',
        timestamps: true
    }
);

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;