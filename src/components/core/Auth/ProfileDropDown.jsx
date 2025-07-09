import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-gray-200" />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          className="absolute top-[118%] right-0 z-50 w-40 divide-y divide-gray-600 rounded-md border border-gray-700 bg-gray-800"
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 hover:text-white">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 hover:text-white"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}
