const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// AUTH middleware
exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1]; // More reliable than replace()

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded JWT:", decoded); // Debug: show what's inside the token

    // Ensure decoded contains id and accountType (set this properly when signing token)
    if (!decoded.id || !decoded.accountType) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    req.user = decoded; // Attach full decoded user info (e.g., id, accountType)
    next();
  } catch (error) {
    console.log("❌ Authentication error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// isStudent middleware
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(403).json({
        success: false,
        message: "Access denied, you are not a student",
      });
    }
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({
      success: false,
      message: "User role can't be verified, please try again later",
    });
  }
};

// isInstructor middleware
exports.isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Access denied, you are not an instructor",
      });
    }
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({
      success: false,
      message: "User role can't be verified, please try again later",
    });
  }
};

// isAdmin middleware
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied, you are not an admin",
      });
    }
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({
      success: false,
      message: "User role can't be verified, please try again later",
    });
  }
};
