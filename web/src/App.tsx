import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <AuthRoute exact path="/login">
        <Login />
      </AuthRoute>

      <AuthRoute exact path="/register">
        <Register />
      </AuthRoute>

      <PrivateRoute exact path="/">
        <Main />
      </PrivateRoute>
    </Routes>
  );
}

export default App;
