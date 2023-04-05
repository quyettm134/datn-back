const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const axios = require('axios');

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
        const { id: orderId  } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId))
            return res.status(500).send({
                success: false,
                message: "No order with that ID was found"
            });

        else {
            const order = await Order.findById(orderId);

            let thisOrder = {
                ...order,
                product_list: []
            }

            for(var i = 0; i < order.product_list.length; i++) {
                let response = await axios.get(`http://localhost:8086/products/${order.product_list[i].id}`)
                
                thisOrder = {
                    ...order._doc,
                    product_list: [
                        ...thisOrder.product_list,
                        {
                            product: response.data.data.Product,
                            quantity: order.product_list[i].quantity
                        }
                    ]
                }
            }
    
            res.json({
                success: true,
                data: {
                    Order: thisOrder
                }
            });
        }
    },

    getOneUserOrder: async (req,res) => {
        const userId  = req.userId;

        const orders = await Order.find({ user_id: userId });

        let orderList = [
            ...orders
        ];

        for (var i = 0; i < orders.length; i++) {

            for (var j = 0; j < orders[i].product_list.length; j++) {

                let response = await axios.get(`http://localhost:8086/products/${orders[i].product_list[j].id}`)

                orderList[i].product_list[j] = {
                    product: response.data.data.Product,
                    quantity: orders[i].product_list[j].quantity
                }
            }
        }

        res.json({
            success: true,
            data: {
                UserId: userId,
                OrderList: orderList
            }
        })
    },

    createOrder: async (req, res) => {
        const userId = req.userId;

        const products_list = req.body.products_list;

        const total = req.body.total;

        const token = req.body.token;

        let thisUser = await axios.get(`http://localhost:8080/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const userAddress = thisUser.data.data.User.address[0];

        const newOrder = new Order({
            status: 'shipping',
            shipping_address: userAddress,
            order_day: Date.now(),
            product_list: products_list,
            total: total,
            user_id: userId
        });
        
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
                error: error.message
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