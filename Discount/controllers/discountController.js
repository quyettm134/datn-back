const mongoose = require('mongoose');
const Discount = require('../models/discountModel');

const discountController = {
    getDiscounts: async (req, res) => {
        try {
            const Discounts = await Discount.find();
    
            res.status(200).json({
                success: true,
                data: {
                    Discounts: Discounts
                }
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: "Get discounts failed",
                error: error
            });
        }
    },

    getOneDiscount: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No discount with that ID was found"
            });

        else {
            const thisDiscount = await Discount.findById(_id);
    
            res.json({
                success: true,
                data: {
                    Discount: thisDiscount
                }
            });
        }
    },

    createDiscount: async (req, res) => {
        const discount = req.body;
    
        const newDiscount = new Discount(discount);
    
        try {
            await newDiscount.save();
    
            res.status(200).json({
                success: true,
                data: {
                    Discount: newDiscount
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create discount failed",
                error: error
            });
        }
    },

    updateDiscount: async (req, res) => {
        const { id: _id } = req.params;

        const discount = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No discount with that ID was found"
            });

        else {
            const updatedDiscount = await Discount.findByIdAndUpdate(
                _id,
                { ...discount, _id },
                { new: true }
            );
    
            res.json({
                success: true,
                data: {
                    updatedDiscount: updatedDiscount
                }
            });
        }
    },

    deleteDiscount: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No discount with that ID was found"
            });

        else {
            await Discount.findByIdAndDelete(_id);

            res.json({
                success: true,
                message: "Discount successfully deleted"
            });
        }
    }
}

module.exports = discountController;