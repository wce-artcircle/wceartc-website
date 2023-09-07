const nodemailer = require('nodemailer');
require('dotenv').config();

 const sendEmail = async (name, email, otp) => {
    try{
        let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass: process.env.PASS,
            },

        });
        await transporter.sendMail({
            from: process.env.EMAIL,
            to:email,
            subject: 'Registration Successful Confirmation',
            html: `<h2>Hi ${name}</h2>
            <br>
            <p>Get ready to mark your calendar 🗓️, because something incredible is coming your way! We are pleased to inform you that your registration for the GIM 2023 was successful!🎉. Your participation adds a spark to our event, and we can't wait to share this exciting journey with you!!</p>
            <br>
            <p>Your registration otp is <b>${otp}</b></p>
            <br>
            <p>Do not share this OTP with anyone. This is for your entry at the GIM</p>
            <br>
            <p>The event will be held on <b>9 September 2023</b> at <b>WCE Sangli</b>.</p>
            <br>
            <p>Thank you for registering for the event. We are looking forward to seeing you there.Get ready for an adventure like no other!🤩</p>
            <br>
            <p>Please do not hesitate to contact us if you have any queries about the event. We will be happy to assist you in any way we can.</p>
            <br>
            <p>Regards,</p>
            <p>Team ArtCircle</p>
            `,
        });
        console.log('email sent successfully!');
    }
    catch(err){
        console.log('email not sent');
        console.log(err);
    }
 }

module.exports=sendEmail;