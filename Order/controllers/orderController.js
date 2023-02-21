const mongoose = require('mongoose');
const Order = require('../models/orderModel');

const orderController = {
    getOrders: async (req, res) => {
        try {
            const Orders = await Order.find();
    
            res.status(200).json({
                success: true,
                data: {
                    Orders: Orders
                }
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: "Get orders failed",
                error: error
            });
        }
    },

    getOneOrder: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No order with that ID was found"
            });

        else {
            const thisOrder = await Order.findById(_id);
    
            res.json({
                success: true,
                data: {
                    Order: thisOrder
                }
            });
        }
    },

    createOrder: async (req, res) => {
        const order = req.body;
    
        const newOrder = new Order(order);
    
        try {
            await newOrder.save();
    
            res.status(200).json({
                success: true,
                data: {
                    Order: newOrder
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create order failed",
                error: error
            });
        }
    },

    updateOrder: async (req, res) => {
        const { id: _id } = req.params;

        const order = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No order with that ID was found"
            });

        else {
            const updatedOrder = await Order.findByIdAndUpdate(
                _id,
                { ...order, _id },
                { new: true }
            );
    
            res.json({
                success: true,
                data: {
                    updatedOrder: updatedOrder
                }
            });
        }
    },

    deleteOrder: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No order with that ID was found"
            });

        else {
            await Order.findByIdAndDelete(_id);

            res.json({
                success: true,
                message: "Order successfully deleted"
            });
        }
    }
}

module.exports = orderController;