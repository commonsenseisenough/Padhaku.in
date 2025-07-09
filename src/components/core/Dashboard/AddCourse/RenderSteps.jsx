import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      {/* Step Indicators */}
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item, index) => (
          <div className="flex items-center" key={item.id}>
            <div className="flex flex-col items-center">
              <button
                className={`grid aspect-square w-9 place-items-center rounded-full border text-sm font-medium transition-all
                  ${
                    step === item.id
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : step > item.id
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : "bg-gray-700 text-white border-gray-500"
                  }
                `}
              >
                {step > item.id ? <FaCheck className="text-sm" /> : item.id}
              </button>
            </div>

            {/* Line Divider (except after last step) */}
            {index !== steps.length - 1 && (
              <div
                className={`h-[1px] w-24 border-b-2 border-dashed mx-2
                  ${
                    step > item.id ? "border-yellow-400" : "border-gray-500"
                  }
                `}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div
            className="flex min-w-[130px] flex-col items-center gap-y-2"
            key={item.id}
          >
            <p
              className={`text-sm font-medium ${
                step >= item.id ? "text-white" : "text-gray-400"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
