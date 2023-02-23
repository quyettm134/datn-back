const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        role: String,
        fullname: String,
        dob: Date,
        img: String,
        phoneNumber: String,
        favourite: String,
        gender: String,
        address: [String],
        cart: [Object],
        like_list: [String]
    },
    {
        collection: 'User',
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;