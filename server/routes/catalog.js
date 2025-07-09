// routes/catalog.js

const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // your Category model
const Course = require('../models/Course');     // your Course model

router.post('/categorized-courses', async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Category ID is required',
      });
    }

    // Get selected category and populate courses
    const selectedCategory = await Category.findById(categoryId).populate({
      path: "courses",
      match: { status: "Published" }, // 💡 Only Published courses
    });

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Get different category and its published courses
    const differentCategory = await Category.findOne({
      _id: { $ne: categoryId },
    }).populate({
      path: "courses",
      match: { status: "Published" },
    });

    // Get most selling courses that are Published
    const mostSellingCourses = await Course.find({ status: "Published" })
      .sort({ sold: -1 }) // assuming you track how many sold
      .limit(10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.error('Categorized Courses API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching categorized courses',
    });
  }
});


module.exports = router;
