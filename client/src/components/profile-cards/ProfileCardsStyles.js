import styled from "styled-components";

export const ProfileCardsStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 13.3rem;
  row-gap: 6rem;
  justify-content: space-between;

  @media screen and (max-width: 1679px) {
    column-gap: 2rem;
  }
`;
