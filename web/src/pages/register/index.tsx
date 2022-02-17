import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import bcryptjs from "bcryptjs";
import "./styles.scss";
import { createUser, getUserByLogin } from "../../api/user";
import { signIn } from "../../api/auth";
import { useAppDispatch } from "../../hooks/useTypedSelector";

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

    const hashedPassword = await bcryptjs.hash(password, 10);
    const usersCreateResponse = await createUser(login, hashedPassword);

    // if (usersCreateResponse.ok) {
    //     try {
    //         await signIn(
    //             login,
    //             password,
    //             (usr) => dispatch(setCurrentUser(usr)),
    //             setErrorMessage,
    //         );
    //     } catch (err) {
    //         setErrorMessage(`${err}`);
    //     }
    // } else {
    //     setErrorMessage(usersCreateResponse.msg);
    // }
    setIsLoading(false);
};


  };
// };

export default Register;
