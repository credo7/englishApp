import "./App.scss";
import MainPage from "./pages/mainPage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <div className="App">
        <Route path="/" element={<MainPage />} />
      </div>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
