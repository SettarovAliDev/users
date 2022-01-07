import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --text-color-dark-1: #14142B;
    --text-color-dark-2: #4E4B66;
    --text-color-light-1: #6E7191;

    --button-color-grey: #EFF0F6;

    --background-color-white: #ffffff;
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    color: var(--text-color-dark-1)
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: #F7F7FC;
  }
`;

export const ContainerStyled = styled.main`
  max-width: 168rem;
  margin: 8rem auto;

  @media screen and (max-width: 1679px) {
    padding: 0 1rem;
  }
`;

export const MainHeading = styled.h2`
  font-size: 3.6rem;
  font-weight: 400;
  letter-spacing: 1px;
  padding: 6rem 0;
`;
