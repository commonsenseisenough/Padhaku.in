import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating'
import { Link } from 'react-router-dom'

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="rounded-lg shadow-md border border-gray-300 transition hover:shadow-lg">
        <div className="rounded-t-lg overflow-hidden">
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`${Height} w-full object-cover`}
          />
        </div>
        <div className="flex flex-col gap-2 px-3 py-4 bg-white">
          <p className="text-lg font-semibold text-gray-800">{course?.courseName}</p>
          <p className="text-sm text-gray-600">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-600 font-medium">
              {avgReviewCount || 0}
            </span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-gray-500">
              ({course?.ratingAndReviews?.length} Ratings)
            </span>
          </div>
          <p className="text-base font-bold text-gray-900">₹ {course?.price}</p>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card
