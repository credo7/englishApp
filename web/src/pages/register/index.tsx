import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import bcryptjs from "bcryptjs";
import "./styles.scss";
import { createUser, getUserByLogin } from "../../api/user";
import { signIn } from "../../api/auth";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import CircleLoading from "../../components/CircleLoading";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  weight: 100%;
  background-color: #20222a;
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

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

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

    const usersCreateResponse = await createUser(login, password);

    if (usersCreateResponse.access_token) {
      try {
        await signIn(login, password, setErrorMessage).finally(() => {
          navigate("/");
        });
      } catch (err) {
        setErrorMessage(`${err}`);
      }
    } else {
      setErrorMessage(usersCreateResponse.msg);
    }

    setIsLoading(false);
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

        <span className="separator">Or</span>

        <Link className="register-link" to="/login">
          Sign in
        </Link>
      </div>
    </Container>
  );
};

export default Register;
