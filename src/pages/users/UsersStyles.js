import styled from "styled-components";

export const UsersCards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 6rem;
  column-gap: 3.2rem;
`;

export const UsersCard = styled.li`
  width: calc((100% - 3.2rem * 3) / 4);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 5rem;
  border-radius: 1.6rem;
  background-color: var(--background-color-white);
  color: var(--text-color-dark-2);

  @media screen and (max-width: 1679px) {
    width: calc((100% - 3.2rem * 2) / 3);
    min-width: 39.6rem;
  }

  @media screen and (max-width: 1272px) {
    width: calc((100% - 3.2rem) / 2);
    min-width: 39.6rem;
  }

  @media screen and (max-width: 860px) {
    width: 100%;
    min-width: 39.6rem;
  }
`;

export const UsersCardHeading = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  letter-spacing: 0.75px;
  line-height: 1;
`;

export const UsersCardSpan = styled.span`
  font-size: 2.4rem;
  font-weight: 400;
  letter-spacing: 0.75px;
`;
