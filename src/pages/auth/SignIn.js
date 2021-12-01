import { AuthContainer, AuthHeading, AuthForm, AuthLink } from "./AuthStyles";

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
        <AuthLink to="/sign-up">Sign Up</AuthLink>
      </AuthForm>
    </AuthContainer>
  );
};

export default SignIn;
