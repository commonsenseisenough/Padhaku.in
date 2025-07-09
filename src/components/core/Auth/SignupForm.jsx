import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const signupData = { ...formData, accountType }
    dispatch(setSignupData(signupData))
    dispatch(sendOtp(email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ]

  return (
    <div className="w-full max-w-[500px]">
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <label className="w-full">
            <p className="text-sm mb-1 text-gray-100">First Name <sup className="text-pink-500">*</sup></p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-lg bg-gray-800 p-3 text-white border border-gray-700 focus:outline-none focus:border-yellow-300"
            />
          </label>

          <label className="w-full">
            <p className="text-sm mb-1 text-gray-100">Last Name <sup className="text-pink-500">*</sup></p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-lg bg-gray-800 p-3 text-white border border-gray-700 focus:outline-none focus:border-yellow-300"
            />
          </label>
        </div>

        <label>
          <p className="text-sm mb-1 text-gray-100">Email Address <sup className="text-pink-500">*</sup></p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email"
            className="w-full rounded-lg bg-gray-800 p-3 text-white border border-gray-700 focus:outline-none focus:border-yellow-300"
          />
        </label>

        <div className="flex flex-col md:flex-row gap-4">
          <label className="relative w-full">
            <p className="text-sm mb-1 text-gray-100">Create Password <sup className="text-pink-500">*</sup></p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter password"
              className="w-full rounded-lg bg-gray-800 p-3 pr-10 text-white border border-gray-700 focus:outline-none focus:border-yellow-300"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          <label className="relative w-full">
            <p className="text-sm mb-1 text-gray-100">Confirm Password <sup className="text-pink-500">*</sup></p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm password"
              className="w-full rounded-lg bg-gray-800 p-3 pr-10 text-white border border-gray-700 focus:outline-none focus:border-yellow-300"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 bg-yellow-400 text-black rounded-lg py-3 font-semibold hover:bg-yellow-500 transition duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
