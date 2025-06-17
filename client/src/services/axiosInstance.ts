// services/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://team-alpha-profile-card-auth-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
