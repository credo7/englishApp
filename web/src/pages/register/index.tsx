import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.scss";
import { createUser, getUserByLogin } from "../../api/user";
import CircleLoading from "../../components/CircleLoading";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../context/AuthContext";

const Container = styled.div`
  height: 100%;
  weight: 100%;
  background-color: #161b22;
`;

interface IRegisterForm {
  login: string;
  password: string;
  passwordConfirm: string;
}

const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const { loginUser } = useContext(AuthContext);

  useEffect(() => {
    if (errors.login) {
      return setErrorMessage(errors.login.message || "Error");
    }

    if (errors.password) {
      return setErrorMessage(errors.password.message || "Error");
    }

    if (errors.passwordConfirm) {
      return setErrorMessage(errors.passwordConfirm.message || "Error");
    }
  }, [errors]);

  const onSubmit: SubmitHandler<IRegisterForm> = async ({
    login,
    password,
    passwordConfirm,
  }) => {
    login = login.trim().toLowerCase();

    if (login.length < 4)
      return setError("login", {
        type: "manual",
        message: "Login is too short",
      });

    if (login.length > 16)
      return setError("login", {
        type: "manual",
        message: "Login is too long",
      });

    if (password.length < 6)
      return setError("password", {
        type: "manual",
        message: "Password is too short",
      });

    if (password !== passwordConfirm)
      return setError("passwordConfirm", {
        type: "manual",
        message: "Passwords are not equal",
      });

    setIsLoading(true);
    const user = await getUserByLogin(login);

    if (user) {
      setErrorMessage("User with this login already exists");
      setIsLoading(false);

      return;
    }

    const usersCreateResponse = await createUser(login, password, loginUser);
  };

  return (
    <Container>
      <div className="register-container">
        <h1>Registration</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Login"
            autoComplete="username"
            {...register("login", { required: true })}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...register("password", { required: true })}
          />
          <input
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            {...register("passwordConfirm", { required: true })}
          />
          {errorMessage && <span className="errors">{errorMessage}</span>}
          <button type="submit" className="register-btn">
            {isLoading ? (
              <CircleLoading bgColor="#fff" width="35px" height="35px" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <Link className="register-link" to="/login">
          <div className="register-link-question">Already have profile?</div>{" "}
          <div className="register-link-answer">Sign in</div>
        </Link>
      </div>
    </Container>
  );
};

export default Register;
