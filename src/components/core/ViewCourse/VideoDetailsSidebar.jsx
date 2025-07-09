import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
// import React, {useState } from "react";


export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()

  // ✅ Safe destructuring
  const viewCourse = useSelector((state) => state.viewCourse) || {}
  const {
    courseSectionData = [],
    courseEntireData = {},
    totalNoOfLectures = 0,
    completedLectures = [],
  } = viewCourse

  useEffect(() => {
    if (!courseSectionData.length) return
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData?.[
      currentSectionIndx
    ]?.subSection.findIndex((data) => data._id === subSectionId)
    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[
        currentSubSectionIndx
      ]?._id
    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
    setVideoBarActive(activeSubSectionId)
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r bg-gray-900 text-white">
      {/* Top Section */}
      <div className="mx-5 border-b border-gray-700 py-5 text-lg font-bold">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 hover:scale-95 transition-transform"
            title="Back"
          >
            <IoIosArrowBack size={20} />
          </button>
          <IconBtn
            text="Add Review"
            customClasses="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            onclick={() => setReviewModal(true)}
          />
        </div>
        <div className="mt-4">
          <p className="text-white">{courseEntireData?.courseName}</p>
          <p className="text-sm font-medium text-gray-400">
            {completedLectures?.length} / {totalNoOfLectures} Completed
          </p>
        </div>
      </div>

      {/* Course Content */}
      <div className="h-full overflow-y-auto px-2">
        {courseSectionData.map((course, index) => (
          <div
            className="mt-2 text-sm"
            onClick={() => setActiveStatus(course?._id)}
            key={index}
          >
            {/* Section Header */}
            <div className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded cursor-pointer">
              <div className="font-semibold w-[70%] truncate">
                {course?.sectionName}
              </div>
              <div
                className={`transform transition-transform duration-300 ${
                  activeStatus === course?._id ? "rotate-180" : ""
                }`}
              >
                <BsChevronDown />
              </div>
            </div>

            {/* Sub Sections */}
            {activeStatus === course?._id && (
              <div className="transition-all duration-300">
                {course.subSection.map((topic, i) => (
                  <div
                    className={`flex items-start gap-3 px-5 py-2 rounded ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 text-gray-900 font-semibold"
                        : "hover:bg-gray-800"
                    }`}
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      )
                      setVideoBarActive(topic._id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      readOnly
                      className="mt-1 accent-green-500"
                    />
                    <span className="leading-5">{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
