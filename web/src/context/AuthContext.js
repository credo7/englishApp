import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalActivate } from "../store/action-creators/modal";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("accessToken")
      ? jwt_decode(localStorage.getItem("accessToken"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    // const api = axios.create({
    //   baseURL: API_URL,
    // });

    // api.interceptors.request.use((config) => {
    //   if (config.headers) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }

    //   return config;
    // });

  const loginUser = async (login, password) => {
    let response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setToken(data.accessToken);
      setUser(jwt_decode(data.accessToken));
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    } else {
      dispatch(modalActivate("Oops.. Something went wrong"));
    }
  };

  let logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  let updateToken = async () => {
    let response = await fetch("http://localhost:3001/auth/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    let data = await response.json();

    if (response.status === 200) {
      setToken(data);
      setUser(jwt_decode(data));
      localStorage.setItem("accessToken", data);
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  // const uptToken = async () => {
  //   const r = await this.api.post('auth/refresh').then((res) => res.data)
  //   console.log(r)

  // };

  let contextData = {
    user,
    token,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMinutes = 5000;
    //  * 60 * 4;

    let interval = setInterval(() => {
      if (token) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [token, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
