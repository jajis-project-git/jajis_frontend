import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/";

export const API = axios.create({
  baseURL: API_BASE_URL,
});

// Attach auth token (DRF TokenAuth)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
