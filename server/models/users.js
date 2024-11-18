// const mongoose = require('mongoose');
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
        maxlength: 100,
    }
});

const User = mongoose.model('User', userSchema);

// module.exports = User;
export default User;
