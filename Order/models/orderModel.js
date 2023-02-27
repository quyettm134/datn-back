const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        type: {
            type: String
        },
        order_day: Date,
        shipping_address: String,
        payment_type: String,
        status: String,
        product_list: [Object],
        vouchers_list: [String],
        total: {
            type: Number
        },
        user_id: String
    },
    {
        collection: 'Order',
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;