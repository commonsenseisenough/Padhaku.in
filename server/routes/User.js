// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const { signUp, login, sendOTP, changePassword } = require('../controllers/Auth');
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword")
const { auth } = require("../middlewares/auth")
// const {updateProfilePicture}=require('../controllers/Profile')


// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)             // ✅ FIXED
// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)           // ✅ FIXED
// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// router.post('updateProfilePicture',auth,updateProfilePicture)

// Export the router
module.exports = router
