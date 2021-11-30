import { AuthContainer, AuthHeading, AuthForm } from "./AuthStyles";

const SignIn = () => {
  return (
    <AuthContainer>
      <AuthHeading>Sign in</AuthHeading>
      <AuthForm>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
        <button type="submit">Sign In</button>
      </AuthForm>
    </AuthContainer>
  );
};

export default SignIn;
