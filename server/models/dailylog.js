// const mongoose = require('mongoose');
import mongoose from "mongoose";
const dailyLogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true
    },
    calories: {
        type: Number
    },
    water_glasses: {
        type: Number
    },
    log_date: {
        type: Date,
        required: true
    }
});

// Enforce unique constraint on the combination of user_id and log_date
dailyLogSchema.index({ user_id: 1, log_date: 1 }, { unique: true });

const DailyLog = mongoose.model('DailyLog', dailyLogSchema);

export default DailyLog;
