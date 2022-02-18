import Main from "./pages/mainPage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
