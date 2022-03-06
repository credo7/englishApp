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
