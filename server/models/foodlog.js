// const mongoose = require('mongoose');
import mongoose from "mongoose";
const foodLogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true
    },
    food_name: {
        type: String,
        required: true,
        maxlength: 100
    },
    quantity: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    log_date: {
        type: Date,
        default: Date.now // Sets default to the current date
    }
});

const FoodLog = mongoose.model('FoodLog', foodLogSchema);

export default FoodLog;
