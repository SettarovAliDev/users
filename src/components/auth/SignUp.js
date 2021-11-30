import { AuthContainer, AuthHeading, AuthForm } from "./AuthStyles";

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
        <button type="submit">Sign Up</button>
      </AuthForm>
    </AuthContainer>
  );
};

export default SignUp;
