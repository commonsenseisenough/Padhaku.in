import React from "react"
import ContactUsForm from "../../ContactPage/ContactUsForm"

const ContactFormSection = () => {
  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-800">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-white">
          Get in Touch
        </h1>
        <p className="text-center text-gray-400 mt-3 text-sm sm:text-base">
          We'd love to hear from you. Please fill out the form below.
        </p>

        <div className="mt-10">
          <ContactUsForm />
        </div>
      </div>
    </div>
  )
}

export default ContactFormSection
