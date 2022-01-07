import styled, { keyframes } from "styled-components";

export const SpinnerOverlay = styled.div`
  height: ${(props) => (props.big ? "100vh" : "100%")};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: ${(props) => spin} 1s ease-in-out infinite;
  -webkit-animation: ${(props) => spin} 1s ease-in-out infinite;
`;

const spin = (props) => {
  return keyframes`
    to {
      -webkit-transform: rotate(360deg);
    }
  `;
};
