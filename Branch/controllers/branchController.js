const mongoose = require('mongoose');
const Branch = require('../models/branchModel');

const branchController = {
    getBranches: async (req, res) => {
        try {
            const Branches = await Branch.find();
    
            res.status(200).json({
                success: true,
                data: {
                    Branches: Branches
                }
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: "Get branches failed",
                error: error
            });
        }
    },

    getOneBranch: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No branch with that ID was found"
            });

        else {
            const thisBranch = await Branch.findById(_id);
    
            res.json({
                success: true,
                data: {
                    Branch: thisBranch
                }
            });
        }
    },

    createBranch: async (req, res) => {
        const branch = req.body;
    
        const newBranch = new Branch(branch);
    
        try {
            await newBranch.save();
    
            res.status(200).json({
                success: true,
                data: {
                    Branch: newBranch
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create branch failed",
                error: error
            });
        }
    },

    updateBranch: async (req, res) => {
        const { id: _id } = req.params;

        const branch = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No branch with that ID was found"
            });

        else {
            const updatedBranch = await Branch.findByIdAndUpdate(
                _id,
                { ...branch, _id },
                { new: true }
            );
    
            res.json({
                success: true,
                data: {
                    updatedBranch: updatedBranch
                }
            });
        }
    },

    deleteBranch: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No branch with that ID was found"
            });

        else {
            await Branch.findByIdAndDelete(_id);

            res.json({
                success: true,
                message: "Branch successfully deleted"
            });
        }
    }
}

module.exports = branchController;