import { createContext, useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalActivate } from "../store/action-creators/modal";

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
      ? jwt_decode(localStorage.getItem("accessToken") || "")
      : null
  );
  const [loading, setLoading] = useState(true);

  const [logged, setLogged] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginUser = async (login, password) => {
    let response = await fetch("http://localhost:8080/auth/login", {
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
      localStorage.setItem("refreshToken", data.refreshToken);
      setLogged(true);
      navigate("/");
    } else {
      dispatch(modalActivate("Oops.. Something went wrong"));
    }
  };

  const logoutUser = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLogged(false);
    navigate("/login");
  }, [navigate]);

  const updateToken = useCallback(async () => {
    if (user && token && window.location.pathname === "/") {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await fetch("http://localhost:8080/auth/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ refreshToken }),
      });

      let data = await response.json();

      if (response.status === 200) {
        setToken(data.accessToken);
        setUser(jwt_decode(data.accessToken));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      } else {
        logoutUser();
      }
    }
    if (loading) {
      setLoading(false);
    }
  }, [token, loading, logoutUser, user]);

  let contextData = {
    user,
    token,
    loginUser,
    logged,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourteenMinutes = 14 * 60 * 1000;

    let interval = setInterval(() => {
      if (token) {
        updateToken();
      }
    }, fourteenMinutes);
    return () => clearInterval(interval);
  }, [token, loading, updateToken]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
