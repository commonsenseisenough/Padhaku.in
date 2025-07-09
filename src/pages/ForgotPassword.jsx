import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 bg-gray-950">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-[480px] rounded-2xl bg-gray-900 p-8 shadow-2xl border border-gray-800">
          <h1 className="text-3xl font-bold text-white mb-3">
            Reset your password
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Have no fear. We'll email you instructions to reset your password.{" "}
            If you don't have access to your email, we can try account recovery.
          </p>

          <form onSubmit={handleOnSubmit} className="space-y-4">
            {!emailSent && (
              <div className="flex flex-col">
                <label className="text-sm text-gray-200 mb-1 font-medium">
                  Email Address <sup className="text-pink-500">*</sup>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="rounded-lg bg-gray-800 text-white px-4 py-3 border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 transition duration-200"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-lg font-semibold transition duration-200"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6">
            <Link
              to="/login"
              className="flex items-center gap-2 text-yellow-200 hover:underline text-sm"
            >
              <BiArrowBack /> Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
