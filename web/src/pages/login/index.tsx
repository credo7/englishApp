import "./styles.scss";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import CircleLoading from "../../components/CircleLoading";
import { Link } from "react-router-dom";
import { signIn } from "../../api/auth";

const Container = styled.div`
  height: 100%;
  weight: 100%;
  background-color: #20222a;
`;

const LoginInput = styled.input`
  border-radius: 15px;
  width: calc(400px - 52px);
  border: 1px solid #2c3e50;
  outline: none;
  font-size: 20px;
  padding: 16px 26px;
  margin-bottom: 15px;
  transition: all 0.1s ease-in;
  background: transparent;
  color: white;

  &::selection {
    background: #29aa44;
  }

  &:focus {
    border-color: #29aa44;
  }
`;

interface ILoginInput {
  login: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginErrors, setLoginErrors] = useState<string>("");

  const loginSubmit: SubmitHandler<FieldValues> = async ({
    login,
    password,
  }) => {
    setIsLoading(true);
    signIn(login, password, setLoginErrors).finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <div className="login-container">
        <h1>Login page</h1>
        <form onSubmit={handleSubmit(loginSubmit)}>
          <LoginInput
            type="text"
            placeholder="Login"
            autoComplete="username"
            {...register("login", { required: true })}
          />
          <LoginInput
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />
          <span className="login-errors">{loginErrors}</span>
          <button type="submit" className="login-btn">
            {isLoading ? (
              <CircleLoading bgColor="#fff" width="35px" height="35px" />
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <Link to="/register" className="register-link">
          Register
        </Link>
      </div>
    </Container>
  );
};

export default Login;
function async(arg0: {}) {
  throw new Error("Function not implemented.");
}

