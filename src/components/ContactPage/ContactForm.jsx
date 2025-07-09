import React from "react"
import ContactUsForm from "./ContactUsForm"

const ContactForm = () => {
  return (
    <div className="border border-gray-700 text-gray-300 bg-gray-900 rounded-xl p-6 sm:p-10 lg:p-14 flex flex-col gap-4 shadow-md">
      <h1 className="text-3xl sm:text-4xl font-semibold leading-snug text-white">
        Got an Idea? We've got the skills. Let's team up.
      </h1>

      <p className="text-gray-400 text-base">
        Tell us more about yourself and what you've got in mind.
      </p>

      <div className="mt-6">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactForm
