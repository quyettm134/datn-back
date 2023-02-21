const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        customerId: String,
        orderId: String,
        payment_time: Date
    },
    {
        collection: 'Payment',
        timestamps: true
    }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;