const sendEmail = require('../email/mail');
const Task= require('../models/form');
const OTP=require('../models/otp_collection');

const createNewStudent = async (req, res) => {
    console.log("hello");
    try {
        const { name, prn,phone, email,transactionId } = req.body;
        let otp;
        while (true) {
            otp = Math.floor(1000 + Math.random() * 9000);
            const existingOTP = await OTP.findOne({ otp });
            if (!existingOTP) {
                break;
            }
        }
        const task = await Task.create({ name, prn,phone, email,otp,transactionId});
        await sendEmail(name, email, otp);
        res.status(201).json({ task });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


const verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        const otpRecord = await OTP.findOne({ otp });
        if (!otpRecord) {
            return res.status(404).json({ msg: 'Invalid OTP' });
        }
        if (otpRecord.visited) {
            return res.status(400).json({ msg: 'OTP already used' });
        }
        otpRecord.visited = true;
        await otpRecord.save();
        res.status(200).json({ msg: 'OTP verified' });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const getAllRegisteredStudents = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}

const updateTask =async (req,res) =>{
    
        try {
            console.log(req.params.truthvalue)
            const task = await Task.findOneAndUpdate({_id:req.params.id},{$set:{"visited":req.params.truthvalue}})
            res.status(200).json(task)
    
        } catch (error) {
            res.status(500).json({ msg: err });
        }
    
}
module.exports={createNewStudent,verifyOTP,getAllRegisteredStudents,updateTask};