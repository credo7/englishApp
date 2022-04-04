import "./styles.scss";

import { useContext, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import CircleLoading from "../../components/CircleLoading";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Container = styled.div`
  height: 100vh;
  weight: 100vw;
  background-color: #161b22;
`;

const LoginInput = styled.input`
  box-sizing: border-box;
  border-radius: 5px;
  width: 420px;
  height: 55px;
  border: 1px solid #a9a9a9;
  outline: none;
  font-size: 20px;
  padding: 16px 26px;
  margin-bottom: 30px;
  transition: all 0.1s ease-in;
  color: black;
  box-shadow: 0 20px 40px rgba(88, 166, 255, 0.1);

  &:focus {
    border-color: #58a6ffc4;
  }
`;

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading] = useState<boolean>(false);
  const { loginUser } = useContext(AuthContext);

  const loginSubmit: SubmitHandler<FieldValues> = async ({
    login,
    password,
  }) => {
    loginUser(login, password);
  };

  return (
    <Container>
      <div className="login-container">
        <div className="login-registration">
          <h1>Dictionary</h1>
        </div>
        <form onSubmit={handleSubmit(loginSubmit)}>
          <LoginInput
            className="form-input"
            type="text"
            placeholder="Username"
            autoComplete="username"
            {...register("login", { required: true })}
          />
          <LoginInput
            className="form-input"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />
          <button type="submit" className="login-btn">
            {isLoading ? (
              <CircleLoading bgColor="#fff" width="35px" height="35px" />
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <Link to="/register" className="register-link">
          <div className="register-link-question">No profile?</div>{" "}
          <div className="register-link-answer">Sign up</div>
        </Link>
      </div>
    </Container>
  );
};

export default Login;
