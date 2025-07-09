import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gray-950 text-white">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-yellow-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-gray-950 text-white">
      {/* Sidebar container with fixed width */}
      <div className="w-[220px] shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-6xl py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
