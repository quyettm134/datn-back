const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/userModel');

const userController = {
    getUsers: async (req, res) => {
        try {
            const Users = await User.find();
    
            res.status(200).json({
                success: true,
                data: {
                    Users: Users
                }
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: "Get users failed",
                error: error
            });
        }
    },

    getOneUser: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No user with that ID was found"
            });

        else {
            const user = await User.findById(_id);

            res.json({
                success: true,
                data: {
                    User: thisUser
                }
            });
                
        }
    },

    createUser: async (req, res) => {
        const user = req.body;
    
        const newUser = new User(user);
    
        try {
            await newUser.save();
    
            res.status(200).json({
                success: true,
                data: {
                    User: newUser
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create user failed",
                error: error
            });
        }
    },

    updateUser: async (req, res) => {
        const { id: _id } = req.params;

        const user = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No user with that ID was found"
            });

        else {
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { ...user, _id },
                { new: true }
            );
    
            res.json({
                success: true,
                data: {
                    updatedUser: updatedUser
                }
            });
        }
    },

    deleteUser: async (req, res) => {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(500).send({
                success: false,
                message: "No user with that ID was found"
            });

        else {
            await User.findByIdAndDelete(_id);

            res.json({
                success: true,
                message: "User successfully deleted"
            });
        }
    },

    getOneUserCart: async (req, res) => {
        const { id: _id } = req.params;

        const user = await User.findById(_id);

        let thisUser = {
            ...user,
            cart: []
        }

        for(var i = 0; i < user.cart.length; i++) {
            let response = await axios.get(`http://localhost:8086/products/${user.cart[i].id}`)
            
            thisUser = {
                ...user._doc,
                cart: [
                    ...thisUser.cart,
                    {
                        product: response.data.data.Product,
                        quantity: user.cart[i].quantity
                    }
                ]
            }
        }

        res.json({
            success: true,
            data: {
                User: thisUser
            }
        });
    },

    getOneUserLikeList: async (req, res) => {
        const { id: _id } = req.params;

        const user = await User.findById(_id);

        let thisUser = {
            ...user,
            like_list: []
        }

        for(var i = 0; i < user.like_list.length; i++) {
            let response = await axios.get(`http://localhost:8086/products/${user.like_list[i]}`)
            
            thisUser = {
                ...user._doc,
                like_list: [
                    ...thisUser.like_list,
                    response.data.data.Product,
                ]
            }
        }

        res.json({
            success: true,
            data: {
                User: thisUser
            }
        });
    }
}

module.exports = userController;