import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.jpg"
import BannerImage1 from "../assets/Images/aboutus1.jpg"
import BannerImage2 from "../assets/Images/aboutus2.jpg"
import BannerImage3 from "../assets/Images/aboutus3.jpg"
import Footer from "../components/common/Footer"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
// import HighlightText from "../components/core/HomePage/HighlightText"
import { HighlightText } from "../components/core/HomePage/HighlightText"
import ReviewSlider from "../components/common/ReviewSlider"

const About = () => {
  return (
    <div className="bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="bg-gray-800">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a{" "}
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-3 text-base font-medium text-gray-400 lg:w-[95%]">
              ᴘᴀᴅʜᴀᴋᴜ.ɪɴ is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]" />
          <div className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[30%] grid w-full grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="about1" className="rounded-md" />
            <img src={BannerImage2} alt="about2" className="rounded-md" />
            <img src={BannerImage3} alt="about3" className="rounded-md" />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="border-b border-gray-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-gray-500">
          {/* Reduced height of this spacer significantly as per new UI */}
          <div className="h-[50px] lg:h-[70px]" /> 
          <Quote />
        </div>
      </section>

      {/* Story, Vision, Mission - Adjusted to match the new desired UI */}
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between text-gray-500">
          
          {/* Our Founding Story - Adjusted for closer alignment and wider text */}
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between py-24"> {/* Main section padding */}
            <div className="flex flex-col gap-6 lg:w-[48%]"> {/* Adjusted width slightly, removed my-24, added gap */}
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-full">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-gray-400 lg:w-full">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-gray-400 lg:w-full">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div className="lg:w-[48%]"> {/* Added width for consistency */}
              <img
                src={FoundingStory}
                alt="Founding Story"
                className="shadow-[0_0_20px_0] shadow-[#FC6767] rounded-md w-full h-auto" // Ensure image scales
              />
            </div>
          </div>

          {/* Our Vision and Our Mission - Significantly more vertical space above them */}
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between pt-32 pb-24"> {/* Added substantial top/bottom padding */}
            <div className="flex flex-col gap-6 lg:w-[48%]">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-full">
                Our Vision
              </h1>
              <p className="text-base font-medium text-gray-400 lg:w-full">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:w-[48%]">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-full">
                Our Mission
              </h1>
              <p className="text-base font-medium text-gray-400 lg:w-full">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsComponenet />

      {/* Learning Grid + Contact */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10">
        <LearningGrid />
        <div className="bg-gray-900 rounded-2xl p-8 shadow-lg">
          <ContactFormSection />
        </div>
      </section>

      {/* Review Section */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-gray-900 text-white shadow-lg rounded-xl p-10">
        <h1 className="text-center text-4xl font-semibold">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default About