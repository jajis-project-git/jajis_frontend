import axios from "axios";




// export const API_BASE_URL = "http://localhost:8000/api/";
export const API_BASE_URL = "https://jajisbackend.up.railway.app/api/";


export const API = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically attach token for endpoints that require auth (ecommerce)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
