import React, { useRef } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Course_Card from "./Course_Card"

const CourseSlider = ({ Courses }) => {
  const scrollRef = useRef(null)

  const publishedCourses = Courses?.filter(
    (course) => course.status === "Published"
  )

  const scroll = (direction) => {
    const container = scrollRef.current
    const scrollAmount = 300 // px
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <>
      {publishedCourses?.length > 0 ? (
        <div className="relative w-full">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-gray-700 p-2 rounded-full text-white hover:bg-gray-900"
          >
            <FaChevronLeft />
          </button>

          {/* Scrollable Course Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-4 px-10"
          >
            {publishedCourses.map((course, i) => (
              <div key={i} className="min-w-[280px] max-w-[280px] flex-shrink-0">
                <Course_Card course={course} Height={"h-[250px]"} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gray-700 p-2 rounded-full text-white hover:bg-gray-900"
          >
            <FaChevronRight />
          </button>
        </div>
      ) : (
        <p className="text-xl text-white">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
