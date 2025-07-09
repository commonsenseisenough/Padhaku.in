import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { resetPassword } from "../services/operations/authAPI"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-gray-950 px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-[480px] bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Choose New Password
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Almost done. Enter your new password and you’re all set.
          </p>

          <form onSubmit={handleOnSubmit} className="space-y-5">
            <div className="relative">
              <label className="text-sm text-gray-200 mb-1 block">
                New Password <sup className="text-pink-500">*</sup>
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter new password"
                className="w-full rounded-lg bg-gray-800 text-white px-4 py-3 pr-10 border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-10 cursor-pointer text-gray-400"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} />
                ) : (
                  <AiOutlineEye fontSize={22} />
                )}
              </span>
            </div>

            <div className="relative">
              <label className="text-sm text-gray-200 mb-1 block">
                Confirm New Password <sup className="text-pink-500">*</sup>
              </label>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Re-enter new password"
                className="w-full rounded-lg bg-gray-800 text-white px-4 py-3 pr-10 border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-10 cursor-pointer text-gray-400"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} />
                ) : (
                  <AiOutlineEye fontSize={22} />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-lg font-semibold transition duration-200"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6">
            <Link
              to="/login"
              className="text-sm text-yellow-200 hover:underline flex items-center gap-2"
            >
              <BiArrowBack /> Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
