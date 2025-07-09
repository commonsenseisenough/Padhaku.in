import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border border-rose-700 bg-rose-900 p-8 px-12">
        {/* Icon Section */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-700">
          <FiTrash2 className="text-3xl text-rose-200" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-white">Delete Account</h2>

          <div className="w-3/5 text-rose-100 text-sm leading-6">
            <p>Would you like to delete your account?</p>
            <p>
              This account may contain paid courses. Deleting your account is
              <strong> permanent </strong> and will remove all content
              associated with it.
            </p>
          </div>

          <button
            type="button"
            className="w-fit cursor-pointer italic text-rose-300 hover:text-rose-200 transition"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  )
}
