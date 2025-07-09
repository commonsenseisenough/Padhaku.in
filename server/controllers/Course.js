const Course=require('../models/Course');
const Tag=require('../models/Tag');
const User=require('../models/User');
const {uploadImageToCloudinary}=require('../utils/imageUploader');
const Category=require('../models/Category');
const Section = require('../models/Section');
// import SubSection from '../models/Subsection';
// const SubSection = require("../models/Subsection");
const SubSection=require('../models/SubSection');

const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration"); 



//create course handler fn
exports.createCourse = async (req, res) => {
  try {
    // Logs to debug
    console.log("📥 req.body:", req.body);
    console.log("📥 raw tag (string):", req.body.tag);
    console.log("📥 category:", req.body.category);
    console.log("📥 req.files:", req.files);

    const { courseName, courseDescription, whatYouWillLearn, price, tag: _tag, category } = req.body;
    const thumbnail = req.files.thumbnailImage;
    const tag = JSON.parse(_tag);
    console.log("✅ Parsed tag array:", tag);

    // Validation
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Instructor Check
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // Category check
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details not found",
      });
    }

    // Upload image
    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

    // Create Course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // Push course to instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // Push course to category
    await Category.findByIdAndUpdate(
      { _id: category },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    console.log("✅ New course created:", newCourse);

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error("❌ Error in createCourse:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};


//showAllcourses handler fn

exports.showAllCourses=async (req, res)=>{
    try{
        const allCourses=await Course.find({}, {courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReviews:true,
                                                studentsEnrolled:true,
                                                }).populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message:'All courses fetched successfully',
            data:allCourses,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Failed to fetch all courses',
            error:error.message,
        });
    }
};

//get coursedetails

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: {
        courseDetails: courseDetails,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getInstructorCourses=async(req, res)=>{
    try{
        //get instructor id
        const instructorId=req.user.id;
        //find instructor courses
        const instructorCourses=await Course.find({instructor:instructorId}).sort({createdAt:-1});
        //return response
        return res.status(200).json({
            success:true,
            message:'Instructor courses fetched successfully',
            data:instructorCourses,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Failed to fetch instructor courses',
            error:error.message,
        });
    }
};


exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    console.log("🟡 Received Course Edit Data:", updates);  // ✅ Add this

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }

    // ✅ Update thumbnail if sent
    if (req.files && req.files.thumbnailImage) {
      console.log("🟢 Updating thumbnail...");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // ✅ Update other fields
    for (const key in updates) {
  if (updates.hasOwnProperty(key)) {
    if (key === "tag" || key === "instructions") {
      course[key] = JSON.parse(updates[key]);
    } else if (key === "category") {
      const newCategoryId = updates[key];
      const oldCategoryId = course.category.toString();

      // If category has changed
      if (newCategoryId !== oldCategoryId) {
        // Remove course from old category
        await Category.findByIdAndUpdate(oldCategoryId, {
          $pull: { courses: course._id },
        });

        // Add course to new category
        await Category.findByIdAndUpdate(newCategoryId, {
          $push: { courses: course._id },
        });

        // Update course's category
        course.category = newCategoryId;
      }
    } else {
      course[key] = updates[key];
    }
  }
}


    await course.save();

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("❌ Course update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id

    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    console.log("📦 courseDetails.courseContent:", courseDetails?.courseContent)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // ✅ Debug log to ensure subSections are populated
    courseDetails.courseContent.forEach((section, secIdx) => {
      console.log(`🧩 Section ${secIdx + 1}: ${section.sectionName}`)
      section.subSection.forEach((sub, subIdx) => {
        console.log(`   ▶️ SubSection ${subIdx + 1}: ${sub.title}, Duration: ${sub.timeDuration}s`)
      })
    })

    // ✅ Fetch Course Progress (if any)
    const courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("📊 courseProgressCount:", courseProgressCount)

    // ✅ Calculate total duration
    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration || "0")
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos || [],
      },
    })
  } catch (error) {
    console.error("❌ Error in getFullCourseDetails:", error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
   const studentsEnrolled = course.studentsEnrolled || []
        for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
        })
    }
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
