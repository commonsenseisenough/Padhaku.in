import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) setCourseCategories(categories)
      setLoading(false)
    }

    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category._id) // important
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }

    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ✅ Updated Comparison Logic
  const isFormUpdated = () => {
    const currentValues = getValues()

    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag) ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category._id || // ✅ FIXED
      JSON.stringify(currentValues.courseRequirements) !== JSON.stringify(course.instructions) ||
      currentValues.courseImage !== course.thumbnail
    )
  }

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const formData = new FormData()
        formData.append("courseId", course._id)

        if (data.courseTitle !== course.courseName)
          formData.append("courseName", data.courseTitle)
        if (data.courseShortDesc !== course.courseDescription)
          formData.append("courseDescription", data.courseShortDesc)
        if (data.coursePrice !== course.price)
          formData.append("price", data.coursePrice)
        if (JSON.stringify(data.courseTags) !== JSON.stringify(course.tag))
          formData.append("tag", JSON.stringify(data.courseTags))
        if (data.courseBenefits !== course.whatYouWillLearn)
          formData.append("whatYouWillLearn", data.courseBenefits)
        if (data.courseCategory !== course.category._id)
          formData.append("category", data.courseCategory)
        if (
          JSON.stringify(data.courseRequirements) !==
          JSON.stringify(course.instructions)
        )
          formData.append("instructions", JSON.stringify(data.courseRequirements))
        if (data.courseImage !== course.thumbnail)
          formData.append("thumbnailImage", data.courseImage)

        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)

        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    for (let pair of formData.entries()) {
      console.log("🟢 FormData entry:", pair[0], pair[1]);
    }
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

    setLoading(true)
    const result = await addCourseDetails(formData, token)
    setLoading(false)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-lg border border-gray-700 bg-gray-900 p-8 shadow-lg"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-200" htmlFor="courseTitle">
          Course Title <sup className="text-pink-400">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full text-gray-900 placeholder-gray-500"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-500">
            Course title is required
          </span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-200" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-400">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-none min-h-[130px] w-full text-gray-900 placeholder-gray-500"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-500">
            Course Description is required
          </span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-200" htmlFor="coursePrice">
          Course Price <sup className="text-pink-400">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full pl-12 text-gray-900 placeholder-gray-500"
          />
          <HiOutlineCurrencyRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-500" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-500">
            Course Price is required
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-200" htmlFor="courseCategory">
          Course Category <sup className="text-pink-400">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full text-gray-900 placeholder-gray-500"
        >
          <option value="" disabled className="text-gray-500">
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id} className="bg-gray-100 text-gray-900">
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-500">
            Course Category is required
          </span>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Thumbnail */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-200" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-400">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-none min-h-[130px] w-full text-gray-900 placeholder-gray-500"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-500">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* Requirements */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex items-center gap-x-2 rounded-md bg-gray-700 py-2 px-5 font-semibold text-gray-200 hover:bg-gray-600 transition-all duration-200"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn 
          type="submit"
            disabled={loading} text={!editCourse ? "Next" : "Save Changes"}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
