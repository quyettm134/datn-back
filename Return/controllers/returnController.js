const mongoose = require('mongoose');
const axios = require('axios');
const Return = require('../models/returnModel');

const returnController = {
    getReturnReqs: async (req, res) => {
        try {
            const reqs = await Return.find();
    
            res.status(200).json({
                success: true,
                data: {
                    Requests: reqs
                }
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: "Get requests failed",
                error: error
            });
        }
    },

    getOneUserReturnReq: async (req, res) => {
        const userId = req.userId;

        const reqList = await Return.find({ user_id: userId });

        res.json({
            success: true,
            data: {
                UserId: userId,
                ReqList: reqList
            }
        })
    },

    createReturnRequest: async (req, res) => {
        const userId = req.userId;

        const productId = req.body.productId;

        const reason = req.body.reason;

        let response = await axios.get(`http://localhost:8086/products/${productId}`);

        const product = response.data.data.Product;

        const newReturnRequest = new Return({
            user_id: userId,
            product: product,
            status: 'pending',
            reason: reason
        });

        try {
            await newReturnRequest.save();

            res.status(200).json({
                success: true,
                data: {
                    ReturnReq: newReturnRequest
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create request failed",
                error: error.message
            });
        }
    },

    updateReturnRequest: async (req, res) => {
        const reqId = req.params;

        const newStatus = req.body.newStatus;

        if (!mongoose.Types.ObjectId.isValid(reqId))
            return res.status(500).send({
                success: false,
                message: "No request with that ID was found"
            });

        else {
            const updatedReq = await Return.findByIdAndUpdate(
                reqId,
                { status: newStatus },
                { new: true }
            );

            res.json({
                success: true,
                data: {
                    updatedReq: updatedReq
                }
            });
        }
    },
}

module.exports = returnController;