const mongoose = require('mongoose');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userController = {
    // User
    userLogin: async (req, res) => {
        const user = req.body;
    
        const existedUser = await User.findOne({
            username: user.username,
            password: user.password
        });
    
        if (existedUser) {
            const token = jwt.sign({
                userId: existedUser._id,
                role: existedUser.role
            }, 'secret', { 
                algorithm: 'HS256', 
                expiresIn: '1h' }
            );
    
            res.setHeader('Authorization', token);
    
            res.status(200).json({
                success: true,
                message: 'User logged in succesfully!',
                token: token
            })
        }
        
        else {
            res.status(400).json({
                success: false,
                message: 'Username or password is incorrect!'        
            })
        }
    },

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
        const { userId } = req;

        if (!mongoose.Types.ObjectId.isValid(userId))
            return res.status(500).send({
                success: false,
                message: "No user with that ID was found"
            });

        else {
            const user = await User.findById(userId);

            res.json({
                success: true,
                data: {
                    User: user,
                }
            });   
        }
    },

    createUser: async (req, res) => {
        const user = req.body;
    
        const newUser = new User(user);

        newUser.role = 'customer'

        const existedUser = await User.findOne({
            username: newUser.username
        })
    
        if (!existedUser) {
            try {
                await newUser.save();

                const token = jwt.sign({
                    userId: newUser._id,
                    role: newUser.role
                  }, 'secret', { algorithm: 'HS256', expiresIn: '1h' });
        
                res.status(200).json({
                    success: true,
                    data: {
                        User: newUser
                    },
                    token: token
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Create user failed",
                    error: error
                });
            }
        }

        else {
            res.status(500).json({
                success: false,
                message: "Username already existed!",
            });
        }
    },

    updateUser: async (req, res) => {
        const { userId } = req;

        const userInfo = { ...req.body };

        const user = await User.findById(userId);

        if (!user) {
            return res.status(500).send({
                success: false,
                message: "No user with that ID was found",
            });
        }

        else {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { ...userInfo, userId },
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
    

    // User like list
    getOneUserLikeList: async (req, res) => {
        const { userId } = req;

        const user = await User.findById(userId);

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
                UserLikeList: thisUser.like_list
            }
        });
    },

    addItemToLikeList: async (req,res) => {
        const { userId } = req;

        const productId = req.body.id;

        const user = await User.findById(userId);

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
                userId,
                { like_list: newLikeList },
                { new: true }
            );
    
            res.json({
                success: true,
                data: {
                    UserLikeList: updatedUser.like_list
                }
            }); 
        }            
    },

    deleteItemFromLikeList: async (req, res) => {
        const { userId } = req;

        const productId = req.body.id;

        const user = await User.findById(userId);

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
                userId,
                { like_list: newLikeList },
                { new: true }
            );

            res.json({
                success: true,
                data: {
                    UserLikeList: updatedUser.like_list
                }
            });
        }
    },
}

module.exports = userController;