import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <>
      <h1 className="mb-14 text-3xl font-semibold text-gray-100">Cart</h1>

      <p className="border-b border-b-gray-600 pb-2 font-medium text-gray-400">
        {totalItems} Courses in Cart
      </p>

      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-gray-300">
          Your cart is empty
        </p>
      )}
    </>
  )
}
