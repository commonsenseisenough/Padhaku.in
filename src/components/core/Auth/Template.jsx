import { useSelector } from "react-redux"
import frameImg from "../../../assets/Images/vframe.jpg"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 bg-gray-900">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl gap-8 py-10">
        {/* Left Section */}
        <div className="max-w-[500px] text-white">
          <h1 className="text-4xl font-bold leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-base text-gray-300">
            {description1}
            <span className="text-blue-400 italic"> {description2}</span>
          </p>

          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>

        {/* Right Section with Frame */}
        <div className="relative w-full max-w-[500px]">
          {/* Frame image */}
          <img src={frameImg} alt="frame" className="w-full" />

          {/* User image inside frame */}
          <img
            src={image}
            alt="users"
            className="absolute top-[8%] left-[5%] w-[90%] h-[84%] object-cover rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Template
