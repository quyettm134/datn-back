const mongoose = require('mongoose');
const Voucher = require('../models/voucherModel');

const voucherController = {
    getVouchers: async (req, res) => {
        try {
            const Vouchers = await Voucher.find();
    
            res.status(200).json({
                success: true,
                data: {
                    Vouchers: Vouchers
                }
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: "Get vouchers failed",
                error: error
            });
        }
    },

    getOneVoucher: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No voucher with that ID was found"
            });

        else {
            const thisVoucher = await Voucher.findById(_id);
    
            res.json({
                success: true,
                data: {
                    Voucher: thisVoucher
                }
            });
        }
    },

    createVoucher: async (req, res) => {
        const voucher = req.body;
    
        const newVoucher = new Voucher(voucher);
    
        try {
            await newVoucher.save();
    
            res.status(200).json({
                success: true,
                data: {
                    Voucher: newVoucher
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create voucher failed",
                error: error
            });
        }
    },

    updateVoucher: async (req, res) => {
        const { id: _id } = req.params;

        const voucher = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No voucher with that ID was found"
            });

        else {
            const updatedVoucher = await Voucher.findByIdAndUpdate(
                _id,
                { ...voucher, _id },
                { new: true }
            );
    
            res.json({
                success: true,
                data: {
                    updatedVoucher: updatedVoucher
                }
            });
        }
    },

    deleteVoucher: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No voucher with that ID was found"
            });

        else {
            await Voucher.findByIdAndDelete(_id);

            res.json({
                success: true,
                message: "Voucher successfully deleted"
            });
        }
    }
}

module.exports = voucherController;