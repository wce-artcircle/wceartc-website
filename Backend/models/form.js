const mongoose = require('mongoose');

const studentSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    prn:{
        type:String,
        required: true,
        trim: true
    },
    phone:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        // unique: true,
        required:true,
        trim: true
    },
    otp:{
        type:Number,
        required:true
    },
    visited:{
        type:Boolean,
        default:false,
        required:true
    },
    transactionId:{
        type:String,
        required:true,
        trim:true
    },
});

module.exports=mongoose.model('Student',studentSchema);