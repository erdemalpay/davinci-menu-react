import axios from "axios";
import { BACKEND_URL } from "./configs";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export default axiosInstance;
