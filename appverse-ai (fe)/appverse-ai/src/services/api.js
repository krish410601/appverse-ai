import axios from "axios";

const BASE_URL = "http://localhost:8080";

/**
 * ✅ Public API
 * Used ONLY for:
 * - /auth/login
 * - /auth/register
 */
export const publicAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * ✅ Private API
 * Used for ALL protected APIs
 */
export const privateAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * ✅ Attach JWT automatically for private requests
 */
privateAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);