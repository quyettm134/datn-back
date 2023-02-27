const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/userModel');
const Order = require('../../Order/models/orderModel');

const userController = {
    // User
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
                    User: user
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


    // User cart
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

    updateItemToCart: async (req,res) => {
        const { id: _id } = req.params;

        const product = {
            id: req.body.id,
            quantity: req.body.quantity
        }

        const user = await User.findById(_id);

        const listOfIds = user.cart.map(item => item.id);

        var newCart = [...user.cart];
        
        if (listOfIds.includes(product.id) === true) {
            const index = user.cart.findIndex(cartItem => cartItem.id === product.id);

            newCart[index].quantity += product.quantity;

            if (newCart[index].quantity <= 0) newCart = newCart.filter(cartItem => cartItem.quantity > 0);
        }

        else if (listOfIds.includes(product.id) === false && product.quantity < 0) {
            res.json({
                success: false,
                data: {
                    message: "Invalid quantity"
                }
            })
        }

        else newCart.push(product);

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { cart: newCart },
            { new: true }
        );

        res.json({
            success: true,
            data: {
                User: updatedUser
            }
        });       
    },

    deleteItemFromCart: async (req, res) => {
        const { id: _id } = req.params;

        const productId = req.body.id;

        const user = await User.findById(_id);
        const newCart = user.cart.filter(item => {
            return !productId.includes(item.id);
        });

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { cart: newCart },
            { new: true }
        );

        res.json({
            success: true,
            data: {
                User: updatedUser
            }
        });
    },


    // User like list
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
    },

    addItemToLikeList: async (req,res) => {
        const { id: _id } = req.params;

        const productId = req.body.id;

        const user = await User.findById(_id);

        const listOfIds = user.like_list;

        var newLikeList = [...user.like_list];
        
        if (listOfIds.includes(productId) === true) {
            res.json({
                success: false,
                data: {
                    message: 'Item already exists in like list'
                }
            })
        }

        else {
            newLikeList.push(productId);

            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { like_list: newLikeList },
                { new: true }
            );
    
            res.json({
                success: true,
                data: {
                    User: updatedUser
                }
            }); 
        }            
    },

    deleteItemFromLikeList: async (req, res) => {
        const { id: _id } = req.params;

        const productId = req.body.id;

        const user = await User.findById(_id);

        const listOfIds = user.like_list

        if (listOfIds.includes(productId) === false) {
            res.json({
                success: false,
                data: {
                    message: 'No product with that ID was found in like list'
                }
            })
        } 

        else {
            const newLikeList = user.like_list.filter(item => item !== productId);

            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { like_list: newLikeList },
                { new: true }
            );

            res.json({
                success: true,
                data: {
                    User: updatedUser
                }
            });
        }
    },
}

module.exports = userController;