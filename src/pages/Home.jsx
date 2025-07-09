import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import fp from "../assets/Images/fp.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import bbframe from "../assets/Images/bbframe.jpg";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import signup from "./Signup";
import { Link } from "react-router-dom";



// Newly added components
// import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
// import InstructorSection from "../components/core/HomePage/InstructorSection";
// import ReviewSlider from "../components/common/ReviewSlider";
// import Footer from "../components/common/Footer";

function Home() {
  return (
    <div>
      {/* Section 1: Hero */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        {/* Become an Instructor */}
         <Link to={"/signup"}>   
          <div className="mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <button className="flex items-center gap-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-full text-sm px-5 py-2.5 text-center">
              <span>Become an Instructor</span>
              <FaArrowRight />
            </button>
          </div>
         </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold mt-7">
          Transform Your Career with <HighlightText text="Coding Skills" />
        </div>

        {/* Subtext */}
        <div className="mt-3 w-[90%] text-center text-lg font-bold text-pink-400">
          Learn coding with a purpose, not just syntax.
          <br />
          Build real-world skills and shape your future.
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
          <CTAButton active={false} linkto="/login">Book A Demo</CTAButton>
        </div>

        {/* Video */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video className="shadow-[20px_20px_rgba(255,255,255)]" muted loop autoPlay>
            <source src={fp} type="video/mp4" />
          </video>
        </div>

        {/* Code Blocks */}
        <CodeBlocks
          position="lg:flex-row"
          heading={<h1 className="text-4xl font-bold text-white">Master <span className="text-yellow-400">DSA Concepts</span></h1>}
          subheading="Understand the logic behind every line. Watch, type, and learn."
          ctabtn1={{ active: true, link: "/signup", btnText: "Start Solving" }}
          ctabtn2={{ active: false, link: "/login", btnText: "Explore DSA" }}
          codeColor="text-yellow-400"
          codeblock={`// Binary Search in C++
int binarySearch(int arr[], int n, int key) {
  int low = 0, high = n - 1;
  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == key) return mid;
    else if (arr[mid] < key) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`}
        />

        <CodeBlocks
          position="lg:flex-row-reverse"
          heading={<h1 className="text-4xl font-bold text-white">Learn <span className="text-yellow-400">HTML Basics</span></h1>}
          subheading="Structure your webpages with confidence and clarity."
          ctabtn1={{ active: true, link: "/signup", btnText: "Start Coding" }}
          ctabtn2={{ active: false, link: "/login", btnText: "Explore HTML" }}
          codeColor="text-pink-400"
          codeblock={`<!-- Basic HTML Page -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, ᴘᴀᴅʜᴀᴋᴜ.ɪɴ!</h1>
  <p>Welcome to learning HTML.</p>
</body>
</html>`}
        />
        <ExploreMore/>

      </div>

      {/* <ExploreMore/> */}

      

      {/* Section 2: Background Section */}
      <div
        className="py-20 bg-white relative"
        style={{
          backgroundImage: `url(${bbframe})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-10">
          {/* <div className="text-4xl font-semibold text-center max-w-[600px] text-richblack-700">
            Get the skills you need for a{" "}
            <HighlightText text="Job that is in demand." />
          </div> */}

          <div className="flex flex-row gap-7 mt-4">
            <CTAButton active={true} linkto="/signup">
              <div className="flex items-center gap-2">
                Explore Full Catalog
                <FaArrowRight />
              </div>
            </CTAButton>
            <CTAButton active={false} linkto="/login">Learn More</CTAButton>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 mt-20 w-full">
            <div className="lg:w-[40%] text-4xl font-semibold text-richblack-700">
              Get the Skills you need for a{" "}
              <HighlightText text="Job that is in demand." />
            </div>
            {/* <ExploreMore/> */}

            <div className="flex flex-col  items-start gap-10 lg:w-[40%]">
              <div className="text-richblack-700 text-[16px]">
                The modern ᴘᴀᴅʜᴀᴋᴜ.ɪɴ dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto="/signup">
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          

          {/* Timeline & Language Sections */}
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3: Instructor + Reviews */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection />
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
