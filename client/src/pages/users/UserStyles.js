import styled from "styled-components";

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem;

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const UserDetail = styled.div`
  font-size: 3.2rem;
  line-height: 1.5;
  font-weight: 400;
`;

export const UserStatus = styled.div`
  font-size: 2.4rem;
  line-height: 1.5;
  font-weight: 400;
`;

export const UserActions = styled.div`
  display: flex;
`;

export const UserActionImage = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;

  &:not(:last-child) {
    margin-right: 3.5rem;
  }
`;

export const UserHeading = styled.h2`
  font-size: 3.6rem;
  font-weight: 400;
  letter-spacing: 1px;
  padding-bottom: 6rem;

  @media screen and (max-width: 1679px) {
    text-align: center;
  }
`;
