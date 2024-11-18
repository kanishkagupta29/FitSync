// const mongoose = require('mongoose');
import mongoose from "mongoose";
const personalDetailsSchema = new mongoose.Schema({
    pname: {
        type: String,
        maxlength: 30
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        maxlength: 10
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    goal: {
        type: String,
        maxlength: 50
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true
    }
});

const PersonalDetails = mongoose.model('PersonalDetails', personalDetailsSchema);

// module.exports = PersonalDetails;
export default PersonalDetails;
