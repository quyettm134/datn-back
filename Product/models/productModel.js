const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        material: String,
        desc: String,
        style: String,
        color: String,
        target_audience: String,
        season: String,
        price: Number,
        type: String,
        size: String,
        discountId: String
    },
    {
        collection: 'Product',
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;