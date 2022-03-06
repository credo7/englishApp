import { createContext, useState, useEffect } from "react";
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
      ? jwt_decode(localStorage.getItem("accessToken"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/");
    } else {
      dispatch(modalActivate("Oops.. Something went wrong"));
    }
  };

  let logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  let updateToken = async () => {
    const response = await fetch("http://localhost:3001/auth/refresh/", {
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
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

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

    let fourteenMinutes = 1000 * 60 * 14;

    let interval = setInterval(() => {
      if (token) {
        updateToken();
      }
    }, fourteenMinutes);
    return () => clearInterval(interval);
  }, [token, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
