import Main from "./pages/Main";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { RootState } from "./store/reducers";

function App() {
  const isAuth = useSelector((state: RootState) => state.isAuth);
  if (isAuth) {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }
}

export default App;
