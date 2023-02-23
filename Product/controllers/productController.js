const mongoose = require('mongoose');
const Product = require('../models/productModel');

const productController = {
    getProducts: async (req, res) => {
        try {
            const Products = await Product.find();
    
            res.status(200).json({
                success: true,
                data: {
                    Products: Products
                }
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: "Get products failed",
                error: error
            });
        }
    },

    getOneProduct: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No product with that ID was found"
            });

        else {
            const thisProduct = await Product.findById(_id);
    
            res.status(200).json({
                success: true,
                data: {
                    Product: thisProduct
                }
            });
        }
    },

    createProduct: async (req, res) => {
        const product = req.body;
    
        const newProduct = new Product(product);
    
        try {
            await newProduct.save();
    
            res.status(200).json({
                success: true,
                data: {
                    Product: newProduct
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create product failed",
                error: error
            });
        }
    },

    updateProduct: async (req, res) => {
        const { id: _id } = req.params;

        const product = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No product with that ID was found"
            });

        else {
            const updatedProduct = await Product.findByIdAndUpdate(
                _id,
                { ...product, _id },
                { new: true }
            );
    
            res.json({
                success: true,
                data: {
                    updatedProduct: updatedProduct
                }
            });
        }
    },

    deleteProduct: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No product with that ID was found"
            });

        else {
            await Product.findByIdAndDelete(_id);

            res.json({
                success: true,
                message: "Product successfully deleted"
            });
        }
    },

    getProductByStyle: async (req, res) => {
        const { style: _style } = req.params;
        // console.log({reqparam: req.params.style});
        // if (!mongoose.Types.ObjectId.isValid(_style))
        //     return res.status(500).send({
        //         success: false,
        //         message: "No product with that trend was found"
        //     });

        // else {
            const thisProduct = await Product.find({style:_style})
            res.json({
                success: true,
                data: {
                    Product: thisProduct
                }
            });
        // }
    },

    getProductByTarget: async (req, res) => {
        const { target: _target } = req.params;
        // if (!mongoose.Types.ObjectId.isValid(_style))
        //     return res.status(500).send({
        //         success: false,
        //         message: "No product with that trend was found"
        //     });

        // else {
            const thisProduct = await Product.find({target_audience:_target})
            res.json({
                success: true,
                data: {
                    Product: thisProduct
                }
            });
        // }
    },

    getProductByType: async (req, res) => {
        const { type: _type } = req.params;
        // if (!mongoose.Types.ObjectId.isValid(_style))
        //     return res.status(500).send({
        //         success: false,
        //         message: "No product with that trend was found"
        //     });

        // else {
            const thisProduct = await Product.find({type:_type})
            res.json({
                success: true,
                data: {
                    Product: thisProduct
                }
            });
        // }
    },

    getProductBySeason: async (req, res) => {
        const { season: _season } = req.params;
        // if (!mongoose.Types.ObjectId.isValid(_style))
        //     return res.status(500).send({
        //         success: false,
        //         message: "No product with that trend was found"
        //     });

        // else {
            const thisProduct = await Product.find({season:_season})
            res.json({
                success: true,
                data: {
                    Product: thisProduct
                }
            });
        // }
    },

    getProductByPrice: async (req, res) => {
        const { min: _min } = req.params;
        const { max: _max } = req.params;
        // if (!mongoose.Types.ObjectId.isValid(_style))
        //     return res.status(500).send({
        //         success: false,
        //         message: "No product with that trend was found"
        //     });

        // else {
            const thisProduct = await Product.find({price: {$gt: _min, $lt: _max}})
            res.json({
                success: true,
                data: {
                    Product: thisProduct
                }
            });
        // }
    },
}

module.exports = productController;