import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI"; // Adjust path as needed

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;

    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8"> {/* Added py-8 for vertical padding */}
      {loading ? (
        <div className="flex justify-center items-center h-full"> {/* Better centering for spinner */}
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
            <span className="visually-hidden">Loading...</span> {/* Accessible text for spinner */}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 space-y-6"> {/* Increased padding, added space-y-6 */}
          <h1 className="text-4xl font-extrabold text-white mb-2 text-center">Verify Email</h1> {/* Larger, bolder, centered */}
          <p className="text-gray-400 text-lg leading-relaxed mb-6 text-center"> {/* Slightly larger text, lighter color */}
            A verification code has been sent to your email. Enter the code below.
          </p>

          <form onSubmit={handleVerifyAndSignup} className="space-y-6"> {/* Added space-y-6 to form for better spacing */}
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              containerStyle="flex justify-center gap-3 md:gap-4 mb-6" // Centered and adjusted gap
              renderInput={(props) => (
                <input
                  {...props}
                  className="
                    w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 {/* Slightly larger inputs */}
                    text-white text-3xl font-bold text-center {/* Larger text, bold */}
                    rounded-lg {/* Slightly more rounded */}
                    bg-gray-800 border border-gray-700
                    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                    transition-all duration-200 ease-in-out {/* Smooth transition for focus */}
                    placeholder:text-gray-600 placeholder:text-center {/* Lighter placeholder */}
                  "
                  placeholder="-"
                  type="text" // Ensure text type for flexibility, use pattern for numbers if needed
                  maxLength={1} // Important for single digit per input
                />
              )}
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-lg font-semibold text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl" // Larger button, better hover effects
            >
              Verify Email
            </button>
          </form>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm gap-4"> {/* Flex column for small screens, gap */}
            <Link to="/signup" className="text-yellow-300 hover:underline flex items-center gap-2 font-medium text-base"> {/* Slightly brighter yellow, medium font */}
              <BiArrowBack className="text-xl" /> Back to Signup
            </Link>

            <button
              type="button"
              onClick={() => dispatch(sendOtp(signupData.email, navigate))} // Pass navigate to sendOtp
              className="text-blue-300 hover:text-blue-200 flex items-center gap-1 font-medium text-base transition-colors duration-200" // Slightly brighter blue, font medium
            >
              <RxCountdownTimer className="text-xl" />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;