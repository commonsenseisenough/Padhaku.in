import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import Spinner from "../components/common/Spinner"; // Assuming you have a Spinner component

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true); // Start loading
        const courseData = await getFullDetailsOfCourse(courseId, token);
        console.log("Course Data: ", courseData);

        if (!courseData || !courseData.courseDetails) {
          console.error("Course data or courseDetails missing:", courseData);
          setError("Failed to fetch course details. Please try again.");
          return;
        }

        const { courseDetails, completedVideos } = courseData;

        if (!courseDetails.courseContent || !Array.isArray(courseDetails.courseContent)) {
          console.error("Course content missing or not an array:", courseDetails.courseContent);
          setError("Course content is not available or malformed.");
          return;
        }

        dispatch(setCourseSectionData(courseDetails.courseContent));
        dispatch(setEntireCourseData(courseDetails));
        dispatch(setCompletedLectures(completedVideos || [])); // Ensure it's an array

        let lectures = 0;
        courseDetails.courseContent.forEach((sec) => {
          if (sec.subSection && Array.isArray(sec.subSection) && sec.subSection.length > 0) {
            lectures += sec.subSection.length;
          }
        });
        dispatch(setTotalNoOfLectures(lectures));
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("An error occurred while fetching course details.");
      } finally {
        setLoading(false); // End loading
      }
    };

    if (courseId && token) { // Only fetch if courseId and token are available
      fetchCourseDetails();
    }
  }, [courseId, token, dispatch]); // Added dispatch to dependency array for best practice

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <Spinner /> {/* Or any loading indicator */}
        <p className="text-richblack-500 text-lg">Loading Course...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <p className="text-red-500 text-xl">{error}</p>
        <p className="text-richblack-500 text-lg">Please try refreshing the page.</p>
      </div>
    );
  }

  // If data is loaded and no error, render the course view
  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-indigo-100 to-slate-100">
        {/* Pass the loading state to sidebar if it also depends on course data */}
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-auto max-w-5xl px-6 py-6">
            <div className="rounded-2xl bg-white shadow-md p-6 min-h-[60vh]">
              {/* Outlet will render children. Ensure children also handle initial empty state of Redux store */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}