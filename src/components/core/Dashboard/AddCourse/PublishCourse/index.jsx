import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
  if (
    (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
    (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
  ) {
    goToCourses()
    return
  }

  const formData = new FormData()
        formData.append("courseId", course._id)
        const courseStatus = getValues("public")
            ? COURSE_STATUS.PUBLISHED
            : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus)

        // ✅ Add this block to inspect FormData content
        console.log("🟡 FormData before publish submit:")
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`)
        }

        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)

        if (result) {
            goToCourses()
        }
    }


  const onSubmit = () => {
    console.log("✅ onSubmit triggered")
    handleCoursePublish()
  }

  return (
    <div className="rounded-md border border-gray-600 bg-gray-800 p-6">
      <p className="text-2xl font-semibold text-white">Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg text-white">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-300">
              Make this course public
            </span>
          </label>
        </div>

        {/* Navigation Buttons */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex items-center gap-x-2 rounded-md bg-gray-300 py-2 px-5 font-semibold text-gray-900 hover:bg-gray-400 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <IconBtn type="submit" disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  )
}
