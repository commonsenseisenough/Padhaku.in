import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Images/Logo.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-gray-950 text-gray-300">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent leading-6 mx-auto relative py-14">
        <div className="border-b w-full flex flex-col lg:flex-row pb-5 border-gray-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-gray-700 pl-3 lg:pr-5 gap-3">
            {/* Company */}
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7">
              <img src={Logo} alt="Company Logo" className="object-contain w-24" />
              <h1 className="text-green-500 font-semibold text-[16px]">Company</h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <div
                    key={i}
                    className="text-[14px] text-gray-300 cursor-pointer hover:text-white transition-all duration-200"
                  >
                    <Link to={ele.toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 text-lg text-white mt-3">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {/* Resources */}
            <div className="w-[48%] lg:w-[30%] mb-7">
              <h1 className="text-white font-semibold text-[16px]">Resources</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] text-gray-300 cursor-pointer hover:text-white transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>

              <h1 className="text-white font-semibold text-[16px] mt-7">Support</h1>
              <div className="text-[14px] text-gray-300 cursor-pointer hover:text-white transition-all duration-200 mt-2">
                <Link to="/help-center">Help Center</Link>
              </div>
            </div>

            {/* Plans & Community */}
            <div className="w-[48%] lg:w-[30%] mb-7">
              <h1 className="text-white font-semibold text-[16px]">Plans</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] text-gray-300 cursor-pointer hover:text-white transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>

              <h1 className="text-white font-semibold text-[16px] mt-7">Community</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] text-gray-300 cursor-pointer hover:text-white transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 - FooterLink2 dynamic */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="w-[48%] lg:w-[30%] mb-7">
                <h1 className="text-white font-semibold text-[16px]">{ele.title}</h1>
                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, index) => (
                    <div
                      key={index}
                      className="text-[14px] text-gray-300 cursor-pointer hover:text-white transition-all duration-200"
                    >
                      <Link to={link.link}>{link.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent mx-auto pb-14 text-sm text-gray-400">
        <div className="flex justify-between flex-col lg:flex-row w-full gap-3">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => (
              <div
                key={i}
                className={`${
                  BottomFooter.length - 1 === i
                    ? ""
                    : "border-r border-gray-700"
                } px-3 cursor-pointer hover:text-white transition-all duration-200`}
              >
                <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
              </div>
            ))}
          </div>
          <div className="text-center">Made by Purshottam Vidya Sagar 👨🏻‍💻, ᴘᴀᴅʜᴀᴋᴜ.ɪɴ</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
