import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { logged } = useContext(AuthContext);
  return !logged ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
