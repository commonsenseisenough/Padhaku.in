import React, { useEffect, useState } from "react"
import Footer from "../components/common/Footer"
import { useParams } from "react-router-dom"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogaPageData } from "../services/operations/pageAndComponentData"
import Course_Card from "../components/core/Catalog/Course_Card"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")

  useEffect(() => {
  const getCategories = async () => {
    try {
      const res = await apiConnector("GET", categories.CATEGORIES_API)

      const matchedCategory = res?.data?.data?.find(
        (ct) =>
          ct.name.replace(/[\s/]+/g, "-").toLowerCase() === catalogName
      )

      if (!matchedCategory) {
        console.error("❌ No matching category found for:", catalogName)
        return
      }

      setCategoryId(matchedCategory._id)
    } catch (err) {
      console.error("❌ Error fetching categories:", err)
    }
  }

  getCategories()
}, [catalogName])


  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId)
        console.log("PRinting res: ", res)
        setCatalogPageData(res)
      } catch (error) {
        console.log(error)
      }
    }
    if (categoryId) {
      getCategoryDetails()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-gray-900 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-screen-lg flex-col justify-center gap-4">
          <p className="text-sm text-gray-400">
            Home / Catalog /{" "}
            <span className="text-yellow-400">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-white">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-gray-300">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto box-content w-full max-w-screen-lg px-4 py-12">
        <div className="text-2xl font-semibold text-white">
          Courses to get you started
        </div>
        <div className="my-4 flex border-b border-b-gray-600 text-sm">
          <p
            className={`px-4 py-2 cursor-pointer ${
              active === 1
                ? "border-b border-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 cursor-pointer ${
              active === 2
                ? "border-b border-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="mx-auto box-content w-full max-w-screen-lg px-4 py-12">
        <div className="text-2xl font-semibold text-white">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-auto box-content w-full max-w-screen-lg px-4 py-12">
        <div className="text-2xl font-semibold text-white">
          Frequently Bought
        </div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, i) => (
              <Course_Card course={course} key={i} Height={"h-[400px]"} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Catalog
