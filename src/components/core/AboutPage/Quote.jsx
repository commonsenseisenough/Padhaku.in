import React from "react"
// import HighlightText from "../HomePage/HighlightText"
import { HighlightText } from "../HomePage/HighlightText"

const Quote = () => {
  return (
    <div className="text-center text-white mx-auto py-10 px-4 max-w-4xl">
      <p className="text-xl md:text-4xl font-semibold leading-relaxed">
        We are passionate about revolutionizing the way we learn. Our innovative platform{" "}
        <HighlightText text={"combines technology"} />,{" "}
        <span className="bg-gradient-to-b from-orange-500 to-yellow-400 text-transparent bg-clip-text font-bold">
          expertise
        </span>
        , and community to create an{" "}
        <span className="bg-gradient-to-b from-yellow-600 to-yellow-300 text-transparent bg-clip-text font-bold">
          unparalleled educational experience.
        </span>
      </p>
    </div>
  )
}

export default Quote
