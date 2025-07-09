import React from "react"
import { NavLink } from "react-router-dom"
import * as Icons from "react-icons/vsc"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName] || (() => <span />)

  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        `flex items-center gap-x-2 px-8 py-2 text-sm font-medium transition-all duration-200
        ${isActive ? "text-yellow-400" : "text-gray-300 hover:text-white"}`
      }
    >
      <Icon className="text-lg" />
      <span>{link.name}</span>
    </NavLink>
  )
}
