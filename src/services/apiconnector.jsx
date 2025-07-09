import axios from "axios";
import { BASE_URL } from "./apis";  // ✅ make sure this is exported correctly

export const axiosInstance = axios.create({
  baseURL: BASE_URL, // ✅ Use correct baseURL here
});


// API connector helper
export const apiConnector = (method, url, bodyData = null, headers = {}, params = {}) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};
