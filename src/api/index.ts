import { API_URL } from "@/libs/API"
import axios from "axios"
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
