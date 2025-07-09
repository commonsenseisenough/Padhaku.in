import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
  try {
    const result = await dispatch(updateProfile(token, data));
    
    // Optional: you can also check result?.payload if needed
    // Wait for update to finish then navigate
    navigate("/dashboard/my-profile");
    
    // Optional: reload to get fresh profile data
  } catch (error) {
    console.log("ERROR MESSAGE - ", error.message);
  }
};


  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border border-gray-700 bg-gray-900 p-8 px-12">
        <h2 className="text-lg font-semibold text-white">Profile Information</h2>

        {/* Name Row */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName" className="text-sm text-gray-300">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              className="rounded-md bg-gray-800 p-2 text-white placeholder:text-gray-400 border border-gray-600 focus:border-yellow-500 focus:outline-none"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="text-sm text-yellow-400">Please enter your first name.</span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName" className="text-sm text-gray-300">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              className="rounded-md bg-gray-800 p-2 text-white placeholder:text-gray-400 border border-gray-600 focus:border-yellow-500 focus:outline-none"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
              <span className="text-sm text-yellow-400">Please enter your last name.</span>
            )}
          </div>
        </div>

        {/* DOB and Gender */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="dateOfBirth" className="text-sm text-gray-300">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="rounded-md bg-gray-800 p-2 text-white placeholder:text-gray-400 border border-gray-600 focus:border-yellow-500 focus:outline-none"
              {...register("dateOfBirth", {
                required: { value: true, message: "Please enter your Date of Birth." },
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <span className="text-sm text-yellow-400">{errors.dateOfBirth.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="gender" className="text-sm text-gray-300">Gender</label>
            <select
              name="gender"
              id="gender"
              className="rounded-md bg-gray-800 p-2 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {genders.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
            {errors.gender && (
              <span className="text-sm text-yellow-400">Please select your gender.</span>
            )}
          </div>
        </div>

        {/* Contact & About */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="contactNumber" className="text-sm text-gray-300">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter contact number"
              className="rounded-md bg-gray-800 p-2 text-white placeholder:text-gray-400 border border-gray-600 focus:border-yellow-500 focus:outline-none"
              {...register("contactNumber", {
                required: { value: true, message: "Please enter your Contact Number." },
                maxLength: { value: 12, message: "Invalid Contact Number" },
                minLength: { value: 10, message: "Invalid Contact Number" },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="text-sm text-yellow-400">{errors.contactNumber.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="about" className="text-sm text-gray-300">About</label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Tell us about yourself"
              className="rounded-md bg-gray-800 p-2 text-white placeholder:text-gray-400 border border-gray-600 focus:border-yellow-500 focus:outline-none"
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && (
              <span className="text-sm text-yellow-400">Please enter something about yourself.</span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md bg-gray-600 hover:bg-gray-500 py-2 px-5 text-white font-medium transition-all"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save" />
      </div>
    </form>
  )
}
