import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactForm"
import ReviewSlider from "../components/common/ReviewSlider"

const Contact = () => {
  return (
    <div className="bg-gray-950 text-white">
      {/* Contact Section */}
      <div className="mx-auto mt-20 flex w-11/12 max-w-7xl flex-col gap-10 lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-7xl flex-col items-center gap-8 bg-gray-900 py-12 px-4 rounded-xl shadow-md">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold">
          Reviews from other learners
        </h2>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contact
