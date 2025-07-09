import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  // fetchCourseDetails, // This seems unused based on the provided code
  getFullDetailsOfCourse,
} from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps"

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course) // This 'course' is still null initially
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token)
      console.log("🚀 ~ result", result)

      // --- CHANGE STARTS HERE ---
      if (result?.courseDetails?._id) { // Check if courseDetails exists and has an _id
        dispatch(setEditCourse(true))
        dispatch(setCourse(result.courseDetails)) // Dispatch the actual courseDetails object
      } else {
        // Optional: Add a log or handle the case where courseDetails is not found
        console.error("Course details not found in API response for courseId:", courseId);
        // You might want to set a state to explicitly show a "Course not found" message
        // if this else block is hit after loading completes.
      }
      // --- CHANGE ENDS HERE ---

      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, token, dispatch]) // Added dependencies for clarity, though `dispatch` is stable.
                                 // `courseId` and `token` should be dependencies.

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-gray-100">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-gray-400">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}