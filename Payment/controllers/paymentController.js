const mongoose = require('mongoose');
const Payment = require('../models/paymentModel');

const paymentController = {
    getPayments: async (req, res) => {
        try {
            const Payments = await Payment.find();
    
            res.status(200).json({
                success: true,
                data: {
                    Payments: Payments
                }
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: "Get payments failed",
                error: error
            });
        }
    },

    getOnePayment: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No payment with that ID was found"
            });

        else {
            const thisPayment = await Payment.findById(_id);
    
            res.json({
                success: true,
                data: {
                    Payment: thisPayment
                }
            });
        }
    },

    createPayment: async (req, res) => {
        const payment = req.body;
    
        const newPayment = new Payment(payment);
    
        try {
            await newPayment.save();
    
            res.status(200).json({
                success: true,
                data: {
                    Payment: newPayment
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create payment failed",
                error: error
            });
        }
    },

    updatePayment: async (req, res) => {
        const { id: _id } = req.params;

        const payment = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No payment with that ID was found"
            });

        else {
            const updatedPayment = await Payment.findByIdAndUpdate(
                _id,
                { ...payment, _id },
                { new: true }
            );
    
            res.json({
                success: true,
                data: {
                    updatedPayment: updatedPayment
                }
            });
        }
    },

    deletePayment: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No payment with that ID was found"
            });

        else {
            await Payment.findByIdAndDelete(_id);

            res.json({
                success: true,
                message: "Payment successfully deleted"
            });
        }
    }
}

module.exports = paymentController;