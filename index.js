const express = require('express')
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
require('dotenv').config()
const { connection } = require('./db')

const app = express()
app.use(express.json())

let transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth : {
        user : process.env.EMAIL_USERNAME,
        pass : 'wjhb twwy zkbe peno'
    },
})

  app.post('/request-otp', (req, res) => {
    // Generate a random OTP
    sendOTPverification(req,res)
   
  });


const sendOTPverification = async(req,res)=>{

    try{
        const otp = `${Math.floor(1000+Math.random()*9000)}`
        const mailOption = {
            from : process.env.EMAIL_USERNAME,
            to : req.body.email,
            subject : "Verify Your Email",
            html :  `
            <div style="background-color: #f2f2f2; padding: 20px;">
              <h2 style="color: #ff0000;">Verify Your Email</h2>
              <h1>Welcome to Paaltoo</h1>
              <p>Please enter the following OTP in the app to verify your email:</p>
              <div style="background-color: #ffffff; border: 1px solid #cccccc; padding: 10px; text-align: center;">
                <strong style="color: #ff0000; font-size: 24px;">${otp}</strong>
              </div>
            </div>
          `,


        }
        await transporter.sendMail(mailOption)
        res.send({ msg:'OTP send'})
    } 
    catch(err){
        res.send({err:err})
    }
}

app.listen(4444,()=>{
    console.log('Server Running');
})