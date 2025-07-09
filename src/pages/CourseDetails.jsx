import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch (error) {
        console.log("Could not fetch Course Details");
      }
    })();
  }, [courseId]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!response.success || !response.data?.courseDetails) {
    return <Error />;
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    totalDuration,
  } = response.data.courseDetails;

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg-richblack-900 text-richblack-5">
      <div className="w-full lg:flex lg:gap-8 px-4 py-8 max-w-[1260px] mx-auto">
        {/* Course Info */}
        <div className="lg:w-2/3">
          <img
            src={thumbnail}
            alt="course"
            className="w-full rounded-xl shadow-lg mb-6 max-h-[400px] object-cover"
          />

          <h1 className="text-4xl font-bold mb-2">{courseName}</h1>
          <p className="text-richblack-200 mb-4 text-lg">{courseDescription}</p>

          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
            <span className="text-yellow-25 font-semibold text-lg">
              {avgReviewCount}
            </span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
            <span>({ratingAndReviews.length} reviews)</span>
            <span>{studentsEnrolled.length} students enrolled</span>
          </div>

          <p className="mb-2">Created by {`${instructor.firstName} ${instructor.lastName}`}</p>

          <div className="flex gap-6 text-richblack-200 mb-8">
            <p className="flex items-center gap-1">
              <BiInfoCircle /> Created at {formatDate(createdAt)}
            </p>
            <p className="flex items-center gap-1">
              <HiOutlineGlobeAlt /> English
            </p>
          </div>

          <div className="border border-richblack-600 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">What you'll learn</h2>
            <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
            <p className="mb-4 text-richblack-300">
              {courseContent.length} section(s) • {totalNoOfLectures} lecture(s) • {totalDuration}
            </p>

            <button
              className="text-yellow-25 mb-4"
              onClick={() => setIsActive([])}
            >
              Collapse all sections
            </button>

            {courseContent.map((course, index) => (
              <CourseAccordionBar
                course={course}
                key={index}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Instructor</h2>
            <div className="flex items-center gap-4">
              <img
                src={instructor.image || `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`}
                alt="Instructor"
                className="h-14 w-14 rounded-full object-cover"
              />
              <p className="text-lg font-medium">{`${instructor.firstName} ${instructor.lastName}`}</p>
            </div>
            <p className="text-richblack-50 mt-2">
              {instructor?.additionalDetails?.about}
            </p>
          </div>
        </div>

        {/* Side Card */}
        <div className="lg:w-1/3 hidden lg:block sticky top-20 h-fit">
          <CourseDetailsCard
            course={response.data.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default CourseDetails;
