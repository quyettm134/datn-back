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
    
            res.json({
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
    }
}

module.exports = productController;