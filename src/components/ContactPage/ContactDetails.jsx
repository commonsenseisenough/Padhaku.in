import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon2 from "react-icons/io5"
import * as Icon3 from "react-icons/hi2"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "purshottamvidyasagar376@gmail.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-gray-800 p-4 lg:p-6 shadow-md">
      {contactDetails.map((ele, i) => {
        const Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex flex-col gap-[2px] p-3 text-sm text-gray-300 border-b border-gray-700 last:border-none"
            key={i}
          >
            <div className="flex items-center gap-3 mb-1">
              <Icon size={24} className="text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">{ele.heading}</h2>
            </div>
            <p className="text-gray-400 font-normal">{ele.description}</p>
            <p className="font-medium text-white">{ele.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails
