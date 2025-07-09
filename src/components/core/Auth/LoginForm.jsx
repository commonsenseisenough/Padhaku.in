import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      {/* Email */}
      <label className="w-full">
        <p className="mb-1 text-sm text-white">
          Email Address <sup className="text-red-400">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email"
          className="w-full rounded-md bg-gray-800 text-white p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </label>

      {/* Password */}
      <label className="relative w-full">
        <p className="mb-1 text-sm text-white">
          Password <sup className="text-red-400">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter password"
          className="w-full rounded-md bg-gray-800 text-white p-3 pr-12 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[42px] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={22} className="text-gray-400" />
          ) : (
            <AiOutlineEye fontSize={22} className="text-gray-400" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 text-xs text-blue-400 hover:underline text-right">
            Forgot Password?
          </p>
        </Link>
      </label>

      {/* Button */}
      <button
        type="submit"
        className="mt-6 rounded-md bg-yellow-400 text-black font-semibold py-2 hover:bg-yellow-300 transition duration-200"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
