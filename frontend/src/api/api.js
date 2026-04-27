import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://lost-found-web-portal.onrender.com/api";

const API = axios.create({
  baseURL,
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
