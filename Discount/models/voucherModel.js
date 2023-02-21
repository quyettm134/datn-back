const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema(
    {
        percent: Number,
        end_date: Date,
        condition: Number,
        customerId: String,
        employeeId: String
    },
    {
        collection: 'Voucher',
        timestamps: true
    }
);

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;