const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require('crypto');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

const checkOut = async (req, res) => {
  try{
    var options = {
      amount: 7000,  // amount in the smallest currency unit
      currency: "INR",
      
    };
    const order = await instance.orders.create(options)
    console.log(order);
    res.status(200).json({success:true,order})
  }catch(err){
    console.log(err);
    res.status(500).json({msg:err})
  }
}

const paymentVerification = async (req,res)=>{
  try{
    console.log(req.body);
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

    console.log(generated_signature);
    const isAuthentic = generated_signature == razorpay_signature;
    if (isAuthentic) {
      // res.redirect('http://localhost:5000/payment/checkout')
      // instance.payments.capture(paymentId, amount, currency)
      res.status(200).json({success:true})
      
    }else{
      res.status(400).json({success:false})
    }
  }catch(err){
    res.status(500).json({message:err})
  }
}

module.exports = {checkOut,paymentVerification}