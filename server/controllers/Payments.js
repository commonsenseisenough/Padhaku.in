const { instance } = require('../config/razorpay.js');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const mongoose = require('mongoose');
const crypto = require('crypto');
const CourseProgress = require('../models/CourseProgress');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');


// -----------------------------------------------------------------------------
// Capture Payment
// -----------------------------------------------------------------------------
exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  console.log("💰 [CapturePayment] Received courses:", courses, "for userId:", userId);

  if (courses.length === 0) {
    console.log("❌ [CapturePayment] No course ID provided.");
    return res.json({ success: false, message: "Please Provide Course ID" });
  }

  let total_amount = 0;

  for (const course_id of courses) {
    try {
      const course = await Course.findById(course_id);
      console.log("🔍 [CapturePayment] Found course:", course ? course.courseName : "None", "with ID:", course_id);

      if (!course) {
        console.log("❌ [CapturePayment] Course not found for ID:", course_id);
        return res.status(200).json({ success: false, message: "Course not found" });
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        console.log("⚠️ [CapturePayment] User already enrolled in course:", course_id);
        return res.status(200).json({ success: false, message: "Already Enrolled" });
      }

      total_amount += course.price;
      console.log("➕ [CapturePayment] Added course price. Current total:", total_amount);
    } catch (error) {
      console.log("🔥 [CapturePayment] Error processing course ID:", course_id, error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log("✅ [CapturePayment] Razorpay order created:", paymentResponse);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log("🔥 [CapturePayment] Could not initiate order:", error);
    res.status(500).json({ success: false, message: "Could not initiate order." });
  }
};


// -----------------------------------------------------------------------------
// Verify Payment
// -----------------------------------------------------------------------------
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
  const userId = req.user.id;

  console.log("✅ [VerifyPayment] Received data:", { razorpay_order_id, razorpay_payment_id, courses, userId });


  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
    console.log("❌ [VerifyPayment] Missing payment details.");
    return res.status(200).json({ success: false, message: "Payment Failed" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  console.log("🔑 [VerifyPayment] Expected Signature:", expectedSignature);
  console.log("🔑 [VerifyPayment] Received Signature:", razorpay_signature);


  if (expectedSignature === razorpay_signature) {
    try {
      console.log("🔥 [VerifyPayment] Signatures match. Starting enrollment...");
      await enrollStudents(courses, userId);
      console.log("✅ [VerifyPayment] Enrollment done!");
      return res.status(200).json({ success: true, message: "Payment Verified" });
    } catch (err) {
      console.log("❌ [VerifyPayment] Error during enrollment:", err.message);
      return res.status(500).json({ success: false, message: err.message });
    }
  } else {
    console.log("❌ [VerifyPayment] Signatures do not match. Payment Failed.");
  }

  return res.status(200).json({ success: false, message: "Payment Failed" });
};


// -----------------------------------------------------------------------------
// Send Payment Success Email
// -----------------------------------------------------------------------------
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  console.log("📧 [SendPaymentSuccessEmail] Received data:", { orderId, paymentId, amount, userId });

  if (!orderId || !paymentId || !amount || !userId) {
    console.log("❌ [SendPaymentSuccessEmail] Missing details.");
    return res.status(400).json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);
    console.log("🔍 [SendPaymentSuccessEmail] Found student:", enrolledStudent ? enrolledStudent.email : "None");

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );

    console.log("✅ [SendPaymentSuccessEmail] Email sent successfully.");
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.log("🔥 [SendPaymentSuccessEmail] Error in sending mail:", error);
    return res.status(400).json({ success: false, message: "Could not send email" });
  }
};


// -----------------------------------------------------------------------------
// Enroll Student in Course
// -----------------------------------------------------------------------------
const enrollStudents = async (courses, userId) => {
  console.log("🚀 [EnrollStudents] Starting enrollment for courses:", courses, "and userId:", userId);

  if (!courses || !userId) {
    console.log("❌ [EnrollStudents] Missing courses or userId.");
    throw new Error("Please Provide Course ID and User ID");
  }

  for (const courseId of courses) {
    try {
      console.log(`➡️ [EnrollStudents] Processing courseId: ${courseId}`);

      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        console.log(`❌ [EnrollStudents] Course not found for ID: ${courseId}`);
        throw new Error("Course not found");
      }

      console.log("📘 [EnrollStudents] Updated course:", enrolledCourse.courseName);

      // Check if CourseProgress already exists before creating
      let existingCourseProgress = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      });

      if (existingCourseProgress) {
        console.log("⚠️ [EnrollStudents] CourseProgress already exists for this user and course. Skipping creation.");
        // If it exists, you might want to update it or just skip
        // For now, we'll just log and continue, as the goal is to ensure it exists.
      } else {
        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        });
        console.log("✅ [EnrollStudents] CourseProgress Created with ID:", courseProgress._id);
        console.log("✅ [EnrollStudents] CourseProgress details: courseID=", courseProgress.courseID, "userId=", courseProgress.userId);

        // Only push to user's courseProgress if a new one was created
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: courseProgress._id,
            },
          },
          { new: true }
        );
        console.log("👤 [EnrollStudents] Enrolled student:", enrolledStudent.email);
        console.log("👤 [EnrollStudents] User's courseProgress array after update:", enrolledStudent.courseProgress);

        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        );

        console.log("📧 [EnrollStudents] Email sent response: ", emailResponse.response);
      }
    } catch (error) {
      console.log(`❌ [EnrollStudents] Enrollment Error for course ${courseId}:`, error.message);
      throw error; // Re-throw to be caught by verifyPayment
    }
  }
};
