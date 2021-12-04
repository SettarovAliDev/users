import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageNotFoundStyled = styled.div`
  margin: 15rem auto;
  font-size: 3.6rem;
  font-weight: 400;
  text-align: center;
`;

export const Button = styled(Link)`
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
  text-decoration: none;
  display: inline-block;
`;
