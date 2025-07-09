const express = require("express");
const router = express.Router();

const { updateProfile, deleteAccount, getAllUserDetails,getEnrolledCourses,instructorDashboard } = require("../controllers/Profile");
const { auth,isInstructor } = require("../middlewares/auth");
const {updateProfilePicture}=require('../controllers/Profile')



// Get all user details
router.get("/getUserDetails", auth, getAllUserDetails);

// Update profile
router.put("/updateProfile", auth, updateProfile);

// Delete account
router.delete("/deleteAccount", auth, deleteAccount);

//update display picture
router.put('/updateProfilePicture',auth,updateProfilePicture)

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)



module.exports = router;
