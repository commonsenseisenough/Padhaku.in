const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender'); // Assuming you have a mailSender utility
const { create } = require('./User');


const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // OTP expires in 5 minutes
    },
});


//function to send emails
async function sendVerificationEmail(email, otp) {
    try{
         const mailRespone=await mailSender(email, 'EMAIL Verification from ᴘᴀᴅʜᴀᴋᴜ.ɪɴ',otp);
         console.log('Email sent successfully:', mailRespone);
        return mailRespone;
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
} 

OTPSchema.pre('save', async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});
    



module.exports = mongoose.model('OTP', OTPSchema);


