import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-6 p-6 rounded-lg bg-gray-800 shadow-lg"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* Name Fields */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor="firstname" className="text-sm text-white mb-1">
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            id="firstname"
            type="text"
            placeholder="Enter first name"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 w-full"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <p className="text-xs text-yellow-300 mt-1">
              Please enter your first name.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastname" className="text-sm text-white mb-1">
            Last Name
          </label>
          <input
            id="lastname"
            type="text"
            placeholder="Enter last name"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 w-full"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="text-sm text-white mb-1">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email address"
          className="bg-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 w-full"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-xs text-yellow-300 mt-1">
            Please enter your email address.
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phonenumber" className="text-sm text-white mb-1">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-4">
          <select
            className="bg-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 w-[90px] text-sm"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((ele, i) => (
              <option key={i} value={ele.code}>
                {ele.code} - {ele.country}
              </option>
            ))}
          </select>

          <input
            id="phonenumber"
            type="number"
            placeholder="12345 67890"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 w-full"
            {...register("phoneNo", {
              required: {
                value: true,
                message: "Please enter your Phone Number.",
              },
              maxLength: { value: 12, message: "Invalid Phone Number" },
              minLength: { value: 10, message: "Invalid Phone Number" },
            })}
          />
        </div>
        {errors.phoneNo && (
          <p className="text-xs text-yellow-300 mt-1">
            {errors.phoneNo.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="text-sm text-white mb-1">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          rows="6"
          placeholder="Enter your message here"
          className="bg-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 w-full resize-none"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className="text-xs text-yellow-300 mt-1">
            Please enter your message.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-yellow-400 px-6 py-3 text-sm sm:text-base font-semibold text-black shadow-md hover:scale-95 transition-transform duration-200 disabled:bg-gray-500"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm
