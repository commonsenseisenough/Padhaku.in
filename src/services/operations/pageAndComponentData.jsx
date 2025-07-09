import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogData } from "../apis"

export const getCatalogaPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...")

  try {
    console.log("Sending categoryId to backend ➤", categoryId)

    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId,
    })

    if (!response?.data?.success) {
      throw new Error("Could not fetch category page data")
    }

    return response.data
  } catch (error) {
    console.error("CATALOG PAGE DATA API ERROR:", error)
    toast.error(error?.response?.data?.message || "Something went wrong")
    return error?.response?.data || { success: false }
  } finally {
    toast.dismiss(toastId)
  }
}
