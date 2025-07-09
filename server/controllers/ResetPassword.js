const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // ✅ required

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found with this email',
            });
        }

        const token = crypto.randomUUID();

        await User.findOneAndUpdate(
            { email: email },
            {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        const url = `http://localhost:3000/reset-password/${token}`;
        const mailResponse = await mailSender(
            email,
            'Reset Password',
            `Click on this link to reset your password: ${url}`
        );
        console.log('Email sent successfully:', mailResponse);
        console.log("Token saved to DB:", token);

        return res.status(200).json({
            success: true,
            message: 'Reset password link sent to your email',
        });
        // console.log("Token saved to DB:", token);


    } catch (error) {
        console.error('Error in resetPasswordToken:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while sending reset password link',
        });
    }
};


// resetPassword
exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match"
            });
        }

        const userDetails = await User.findOne({ resetPasswordToken: token });
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "Invalid token"
            });
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token expired,please regenrate ur token"
            });
        }

        console.log("Received password:", password);
        console.log("Confirm password:", confirmPassword);
        console.log("Token:", token);

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { resetPasswordToken: token }, // ✅ Fix here
            {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting password"
        });
    }
};
