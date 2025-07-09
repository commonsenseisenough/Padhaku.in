import React from "react";
import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position}  my-20 justify-between flex-col lg:gap-10 gap-10`}>
      {/* Section 1 */}
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
        {heading}

        {/* Subheading */}
        <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
          {subheading}
        </div>

        {/* Button Group */}
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1?.active} linkto={ctabtn1?.link}>
            <div className="flex items-center gap-2">
              {ctabtn1?.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2?.active} linkto={ctabtn2?.link}>
            {ctabtn2?.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2: Code block with background + shadow */}
      <div className="relative w-full lg:w-[470px]">
        {/* Gradient Background + Shadow Box */}
        <div className="absolute -inset-1 z-[-1] rounded-md bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow-[0_0_20px_4px_rgba(0,0,0,0.5)]" />

        {/* Actual Code Box */}
        <div className="code-border flex flex-row py-3 px-4 text-[10px] sm:text-sm leading-[18px] sm:leading-6 bg-[#0f172a] rounded-md">
          {/* Line Numbers */}
          <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold">
            {[...Array(11)].map((_, i) => (
              <p key={i}>{i + 1}</p>
            ))}
          </div>

          {/* Animated Code */}
          <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pl-2`}>
            <TypeAnimation
              sequence={[codeblock, 1000, ""]}
              cursor={true}
              repeat={Infinity}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
