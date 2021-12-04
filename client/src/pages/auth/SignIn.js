import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUserByPassword } from "../../store/currentUser/currentUserSlice";

import { AuthContainer, AuthHeading, AuthForm, AuthLink } from "./AuthStyles";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={onChangeEmailHandler}
          id="email"
          type="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={onChangePasswordHandler}
          id="password"
          type="password"
        />
        <button type="submit">Sign In</button>
        <AuthLink to="/sign-up">Sign Up</AuthLink>
      </AuthForm>
    </AuthContainer>
  );
};

export default SignIn;
