import "./App.scss";
import MainPage from "./pages/mainPage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <div className="App">
        <Route path="/" element={<MainPage />} />
      </div>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
