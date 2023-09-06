const express =require('express');
const app=express();
const connectDB=require('./db/connect');
require('dotenv').config();
const student= require('./models/form');
const cors = require('cors');

//routes
const routers=require('./routes/routes')
const router=require('./routes/router')

//middlewares
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/register', routers);
app.use('/payment', router);

app.get('/payment/getKey',(req,res)=> res.status(200).json({key: process.env.RAZORPAY_API_KEY}))

const port = process.env.PORT || 5000;
const start = async(url) =>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen((port),()=>{
            console.log(`Server is listening at ${port}...`)
            console.log('MongoDB connected')
        });
    }
    catch(err){
        console.log(err)
    }
} 
start();