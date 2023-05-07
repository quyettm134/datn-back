const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema(
//     {
//         name: String,
//         image: String,
//         material: String,
//         desc: String,
//         style: String,
//         color: String,
//         target_audience: String,
//         season: String,
//         price: {
//             type: Number
//         },
//         type: {
//             type: String,
//         },
//         size: String,
//         discountId: String
//     },
//     {
//         collection: 'Product',
//         timestamps: true
//     }
// );

const productSchema = new mongoose.Schema({
    article_id: String,
    product_code: String,
    prod_name: String,
    product_type_no: String,
    product_type_name: String,
    product_group_name: String,
    graphical_appearance_no: String,
    graphical_appearance_name: String,
    colour_group_code: String,
    colour_group_name: String,
    perceived_colour_value_id: String,
    perceived_colour_value_name: String,
    perceived_colour_master_id: String,
    perceived_colour_master_name: String,
    department_no: String,
    department_name: String,
    index_code: String,
    index_name: String,
    index_group_no: String,
    index_group_name: String,
    section_no: String,
    section_name: String,
    garment_group_no: String,
    garment_group_name: String,
    detail_desc: String,
    price: Number
}, {
    collection: 'TestProduct',
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;