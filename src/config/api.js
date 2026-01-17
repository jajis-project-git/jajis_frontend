import axios from "axios";

// API base URL from environment (Vite requirement)
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/";

export const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// Attach auth token if present (DRF TokenAuth)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
