import axios from "axios";
import { store } from "../store";
import { unauthorized } from "../store/action-creators/auth";
import { modalActivate } from "../store/action-creators/modal";
import { AuthResponse } from "../types/auth";
import { getToken, setToken } from "../utils/token";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }

  return config;
});

// api.interceptors.response.use(
//   (config) => {
//     if (config.headers) {
//       config.headers.Authorization = `Bearer ${getRefreshToken()}`;
//     }

//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
//           withCredentials: true,
//         });
//         setAccessToken(response.data.accessToken);
//         return api.request(originalRequest);
//       } catch (e) {
// 		store.dispatch(unauthorized());
//         store.dispatch(modalActivate("Oops.. User not authorized"));
//       }
//     }
//     throw error;
//   }
// );
