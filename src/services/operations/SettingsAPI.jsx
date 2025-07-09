import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

// 1. Update Display Picture
export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )

      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    } finally {
      toast.dismiss(toastId)
    }
  }
}

// 2. Update Profile
// 2. Update Profile
// import { setUser } from "../../slices/profileSlice"

export function updateProfile(token, data) {
  return async (dispatch, getState) => {
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
        Authorization: `Bearer ${token}`,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // ✅ Fix: get current user and merge manually
      const currentUser = getState().profile.user

      dispatch(setUser({
        ...currentUser,
        additionalDetails: response.data.updatedUserDetails,
      }))

      toast.success("Profile updated successfully")
      return response
    } catch (error) {
      console.error("UPDATE_PROFILE_API ERROR:", error)
      toast.error("Could not update profile")
    }
  }
}





// 3. Change Password
export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })

    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error?.response?.data?.message || "Could Not Change Password")
  } finally {
    toast.dismiss(toastId)
  }
}

// 4. Delete Profile
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })

      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    } finally {
      toast.dismiss(toastId)
    }
  }
}
