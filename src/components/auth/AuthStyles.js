import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15rem auto;
`;

export const AuthHeading = styled.h2`
  font-size: 4.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 40rem;
  margin: 13rem auto;

  label {
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 1.7;
    color: var(--text-color-light-1);
  }

  input {
    font-size: 2.4rem;
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 1px solid var(--text-color-dark-1);
    margin-bottom: 2.5rem;
  }

  button {
    align-self: center;
    padding: 1rem 2.5rem;
    margin-top: 6.5rem;
    font-size: 2.4rem;
    color: var(--text-color-dark-2);
    letter-spacing: 0.75px;
    background-color: var(--button-color-grey);
    border: none;
    border-radius: 1.2rem;
    cursor: pointer;
  }
`;
