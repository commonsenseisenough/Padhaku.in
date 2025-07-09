import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

const COLOR_PALETTE = [
  "#FFD700", "#FF8C00", "#FF6347", "#FF69B4", "#9370DB",
  "#1E90FF", "#00CED1", "#32CD32", "#9ACD32", "#8FBC8F"
]

const generateColors = (count) => {
  return Array.from({ length: count }, (_, i) => COLOR_PALETTE[i % COLOR_PALETTE.length])
}

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  const chartData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: currChart === "students" ? "Students" : "Income",
        data:
          currChart === "students"
            ? courses.map((course) => course.totalStudentsEnrolled)
            : courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateColors(courses.length),
        borderColor: "#1f2937",
        borderWidth: 2,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#f9fafb",
          font: {
            size: 12,
          },
        },
      },
    },
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-2xl bg-gray-900 p-6 shadow-lg">
      <p className="text-lg font-bold text-gray-100">Visualize</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-md px-4 py-1 transition-all duration-200 ${
            currChart === "students"
              ? "bg-yellow-500 text-black shadow-sm"
              : "text-yellow-400 hover:bg-gray-700"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-md px-4 py-1 transition-all duration-200 ${
            currChart === "income"
              ? "bg-yellow-500 text-black shadow-sm"
              : "text-yellow-400 hover:bg-gray-700"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  )
}
