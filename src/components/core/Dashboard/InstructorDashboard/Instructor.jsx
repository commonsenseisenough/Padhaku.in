import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-gray-400">
          Let's start something new
        </p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div className="my-4 flex h-auto flex-col lg:flex-row gap-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <div className="flex-1 max-w-[70%] overflow-auto rounded-md bg-gray-800 p-6">
                <div className="w-full max-h-[100%]">
                  <InstructorChart courses={instructorData} />
                </div>
              </div>
            ) : (
              <div className="flex-1 rounded-md bg-gray-800 p-6">
                <p className="text-lg font-bold text-white">Visualize</p>
                <p className="mt-4 text-xl font-medium text-gray-100">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}

            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-gray-800 p-6">
              <p className="text-lg font-bold text-white">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-gray-400">Total Courses</p>
                  <p className="text-3xl font-semibold text-gray-100">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-400">Total Students</p>
                  <p className="text-3xl font-semibold text-gray-100">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-400">Total Income</p>
                  <p className="text-3xl font-semibold text-gray-100">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Courses */}
          <div className="rounded-md bg-gray-800 p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-white">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-400">View All</p>
              </Link>
            </div>
            <div className="my-4 flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-full lg:w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-gray-100">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-gray-400">
                        {course.studentsEnrolled?.length || 0} students
                      </p>
                      <p className="text-xs font-medium text-gray-400">|</p>
                      <p className="text-xs font-medium text-gray-400">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-gray-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-white">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-400">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}
