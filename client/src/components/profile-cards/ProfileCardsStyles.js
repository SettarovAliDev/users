import styled from "styled-components";

export const ProfileCardsStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 13.3rem;
  row-gap: 6rem;

  @media screen and (max-width: 1679px) {
    justify-content: center;
  }
`;
