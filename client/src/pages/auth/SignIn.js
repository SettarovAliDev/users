import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../components/spinner/Spinner";

import { loginUserByPassword } from "../../store/currentUserSlice";

import {
  AuthContainer,
  AuthHeading,
  AuthForm,
  AuthLink,
  Error,
} from "./AuthStyles";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.currentUser.signInError);
  const status = useSelector((state) => state.currentUser.status);

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(
      loginUserByPassword({
        email,
        password,
      })
    );

    setEmail("");
    setPassword("");
  };

  return (
    <AuthContainer>
      <AuthHeading>Sign in</AuthHeading>
      <AuthForm onSubmit={onSubmitHandler}>
        {error && <Error>{error}</Error>}
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={onChangeEmailHandler}
          id="email"
          type="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={onChangePasswordHandler}
          id="password"
          type="password"
          required
        />
        <button type="submit">
          {status === "loading" ? (
            <Spinner size="3.5rem" />
          ) : (
            <span>Sign In</span>
          )}
        </button>
        <AuthLink to="/sign-up">Sign Up</AuthLink>
      </AuthForm>
    </AuthContainer>
  );
};

export default SignIn;
