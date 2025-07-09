import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      className={`w-full sm:w-[360px] lg:w-[30%] min-h-[320px] box-border cursor-pointer transition-all duration-300 rounded-xl overflow-hidden 
        ${isActive
          ? "bg-gradient-to-br from-yellow-100 to-white shadow-xl scale-[1.03] border-2 border-yellow-300"
          : "bg-gray-800 text-white hover:shadow-md hover:scale-[1.02]"
        }`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Top Section: Heading + Description */}
      <div className="border-b-2 border-dashed border-gray-400 h-[80%] p-6 flex flex-col gap-3">
        <div className={`text-xl font-semibold ${isActive ? "text-gray-900" : "text-white"}`}>
          {cardData?.heading}
        </div>
        <div className={`text-sm ${isActive ? "text-gray-700" : "text-gray-300"}`}>
          {cardData?.description}
        </div>
      </div>

      {/* Bottom Section: Level + Lessons */}
      <div className={`flex justify-between items-center px-6 py-3 text-sm font-medium ${isActive ? "text-blue-600" : "text-gray-400"}`}>
        <div className="flex items-center gap-2">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>
        <div className="flex items-center gap-2">
          <ImTree />
          <p>{cardData?.lessionNumber} Lesson</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
