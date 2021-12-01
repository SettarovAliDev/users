import {
  AuthContainer,
  AuthHeading,
  AuthForm,
  AuthIsAdmin,
  AuthLink,
} from "./AuthStyles";

const SignUp = () => {
  return (
    <AuthContainer>
      <AuthHeading>Create your account</AuthHeading>
      <AuthForm>
        <label htmlFor="username">Username</label>
        <input id="username" type="username" />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
        <AuthIsAdmin>
          <input type="checkbox" id="is-admin" name="is-admin" />
          <label htmlFor="is-admin">is admin</label>
        </AuthIsAdmin>
        <button type="submit">Sign Up</button>
        <AuthLink to="/sign-in">Sign In</AuthLink>
      </AuthForm>
    </AuthContainer>
  );
};

export default SignUp;
