import styled from "styled-components";

export const ProfileCardActions = styled.div`
  display: flex;
  visibility: hidden;
  opacity: 0;
  border-top: 1px solid #d6d8e7;
  width: 100%;
  transition: all 0.3s;
  color: var(--text-color-dark-2);
`;

export const ProfileCardStyled = styled.li`
  min-width: 32rem;
  width: calc((100% - 13.33rem * 3) / 4);
  list-style: none;
  border-radius: 1.6rem;
  background-color: var(--background-color-white);
  border: 1px solid #d6d8e7;
  color: var(--text-color-dark-2);
  overflow: hidden;

  &:hover {
    ${ProfileCardActions} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const PforileCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.5rem 3.2rem;
`;

export const ProfileCardName = styled.div`
  font-size: 2.4rem;
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: 0.75px;
  margin-bottom: 2rem;
`;

export const ProfileCardDetail = styled.div`
  font-size: 2.4rem;
  line-height: 1.5;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export const ProfileCardEdit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 4rem;
  border: none;
  border-right: 1px solid #d6d8e7;
  width: 50%;
  outline: none;
  background-color: transparent;
  font-size: 1.8rem;
  letter-spacing: 0.75px;
  color: var(--text-color-dark-2);
  transition: all 0.2s;

  &:hover {
    background-color: #624af2;
    color: #fcfcfc;
  }
`;

export const ProfileCardDelete = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 4rem;
  width: 50%;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1.8rem;
  letter-spacing: 0.75px;
  color: var(--text-color-dark-2);
  transition: all 0.2s;

  &:hover {
    background-color: #eb0055;
    color: #fcfcfc;
  }
`;

export const ProfileCardIcon = styled.img`
  margin-left: 7px;
  width: 18px;
  height: 18px;
`;
