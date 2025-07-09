import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
    console.log("🧠 MyProfile.jsx | Redux User Data:", user)


  return (
    <div className="text-white">
      <h1 className="mb-10 text-4xl font-bold text-yellow-400 drop-shadow-md">
        👤 My Profile
      </h1>

      {/* Profile Card */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName || "User"}`}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-yellow-400"
            />
            <div>
              <h2 className="text-2xl font-semibold">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
          <IconBtn
            text="Edit Profile"
            onclick={() => navigate("/dashboard/settings")}
            customClasses="bg-yellow-400 text-black hover:bg-yellow-300 transition-all"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-10 rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-yellow-400">📝 About</h3>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
            customClasses="bg-gray-700 hover:bg-gray-600 text-yellow-400"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p className={`text-md font-medium ${user?.additionalDetails?.about ? "text-white" : "text-gray-500 italic"}`}>
          {user?.additionalDetails?.about ?? "Write something about yourself..."}
        </p>
      </div>

      {/* Personal Details */}
      <div className="mt-10 rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-yellow-400">📋 Personal Details</h3>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
            customClasses="bg-gray-700 hover:bg-gray-600 text-yellow-400"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
          {/* Left Column */}
          <div className="space-y-5">
            <Detail label="First Name" value={user?.firstName} />
            <Detail label="Email" value={user?.email} />
            <Detail label="Gender" value={user?.additionalDetails?.gender ?? "Add Gender"} />
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <Detail label="Last Name" value={user?.lastName} />
            <Detail label="Phone Number" value={user?.additionalDetails?.contactNumber ?? "Add Contact Number"} />
            <Detail label="Date Of Birth" value={
              user?.additionalDetails?.dateOfBirth
                ? formattedDate(user?.additionalDetails?.dateOfBirth)
                : "Add Date Of Birth"
            } />
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable field
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-base font-medium">{value}</p>
    </div>
  )
}
