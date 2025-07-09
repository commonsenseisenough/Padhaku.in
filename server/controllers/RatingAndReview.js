const RatingAndReview=require('../models/RatingAndReview');
const Course=require('../models/Course');
const mongoose=require('mongoose')
// import * as mongoose from 'mongoose';

//createRating

exports.createRating=async(req,res)=>{
    try{
        //get user id
        const userId=req.user.id;
        //fetch data
        const {rating, review, courseId}=req.body;
        //validation
        console.log("⭐ userId from token:", userId); 
        console.log("📘 courseId:", courseId);

        const course = await Course.findOne({
            _id: courseId,
            studentsEnrolled: new mongoose.Types.ObjectId(userId),
// ✅ userId is string, match directly
        });


        if(!course){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in course'
            });
        }
        //check if user is enrolled or not
        const alreadyReviewed=await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:'Course already reviewed by the user'
            });
        }
        //create rating
        const ratingReview=await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId,
        });
        //update course with this rating/review
        const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,{
            $push:{
                ratingAndReviews:ratingReview._id,
            },
        },
        {new:true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:'Rating and review created successfully',
            ratingReview,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

//getAverageRatingAndReviews

exports.getAverageRating=async(req, res)=>{
    try{
        //get course id
        const courseId=req.body.courseId;
        //calculate avg rating
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:'$rating'},
                },
            },
        ]);
        //return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            });
        }
        //if no rating exist
        return res.status(200).json({
            success:true,
            message:'Average rating is 0,No ratings given till now ', 
            averageRating:0,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

//getAllRatingAndReviews

exports.getAllRating=async(req, res)=>{
    try{
        const ratings=await RatingAndReview.find({})
        .sort({rating:'desc'})
        .populate({
            path:'user',
            select:'firstName lastName email image',
        })
        .populate({
            path:'course',
            select:'courseName',
        })
        .exec();
        return res.status(200).json({
            success:true,
            data:ratings,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
