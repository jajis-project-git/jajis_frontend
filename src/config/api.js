import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://jajisbackend.up.railway.app/api/";

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

// Automatic fallback: if request to original Railway domain fails, try localhost
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if it's a network/DNS error and we haven't retried yet
    if (!error.response && !originalRequest._retryOnLocalhost) {
      originalRequest._retryOnLocalhost = true;
      
      const fallbackBaseURL = "http://localhost:8000/api/";
      const currentBaseURL = originalRequest.baseURL || API_BASE_URL;
      
      // If the current request is targeting a production domain (not localhost), try falling back to localhost
      if (currentBaseURL && !currentBaseURL.includes("localhost") && !currentBaseURL.includes("127.0.0.1")) {
        console.warn(`Primary API domain failed (${error.message}). Retrying with localhost fallback: ${fallbackBaseURL}`);
        originalRequest.baseURL = fallbackBaseURL;
        
        // Re-execute the request with the new baseURL
        return API(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
