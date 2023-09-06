const mongoose = require('mongoose');

const otpSchema =new mongoose.Schema({
    
    visited:{
        type: Boolean,
        required: true,
        default: false
    },
    otp:{
        type: String,
        required: true,
    }
});

module.exports=mongoose.model('OTP',otpSchema);