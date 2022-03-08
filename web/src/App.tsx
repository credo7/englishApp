import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PrivateRoute><Main /></PrivateRoute>}/><Route/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
     </Router>
  );
}

export default App;
