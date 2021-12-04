import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../store/currentUser/currentUserSlice";

import {
  AuthContainer,
  AuthHeading,
  AuthForm,
  AuthIsAdmin,
  AuthLink,
  Error,
} from "./AuthStyles";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.currentUser.error);

  const onChangeUsernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onChangeIsAdminHandler = (e) => {
    setIsAdmin(e.target.checked);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(
      registerUser({
        username,
        email,
        password,
        roles: isAdmin ? ["user", "admin"] : ["user"],
      })
    );

    setUsername("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
  };

  return (
    <AuthContainer>
      <AuthHeading>Create your account</AuthHeading>
      <AuthForm onSubmit={onSubmitHandler}>
        {error && <Error>{error}</Error>}
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={onChangeUsernameHandler}
          id="username"
          type="username"
          autoComplete="off"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={onChangeEmailHandler}
          id="email"
          type="email"
          autoComplete="off"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={onChangePasswordHandler}
          id="password"
          type="password"
          autoComplete="off"
        />
        <AuthIsAdmin>
          <input
            checked={isAdmin}
            onChange={onChangeIsAdminHandler}
            type="checkbox"
            id="is-admin"
            name="is-admin"
          />
          <label htmlFor="is-admin">is admin</label>
        </AuthIsAdmin>
        <button type="submit">Sign Up</button>
        <AuthLink to="/sign-in">Sign In</AuthLink>
      </AuthForm>
    </AuthContainer>
  );
};

export default SignUp;
