import styled from "styled-components";

import { ReactComponent as EditSvg } from "../../assets/edit.svg";
import { ReactComponent as DeleteSvg } from "../../assets/delete.svg";

export const ProfileCardActions = styled.div`
  display: flex;
  margin-top: auto;
  visibility: hidden;
  opacity: 0;
  border-top: 1px solid #d6d8e7;
  width: 100%;
  transition: all 0.3s;
  color: var(--text-color-dark-2);
`;

export const ProfileCardStyled = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 32rem;
  list-style: none;
  border-radius: 1.6rem;
  background-color: var(--background-color-white);
  border: 1px solid #d6d8e7;
  color: var(--text-color-dark-2);
  overflow: hidden;

  &:hover {
    background-color: #dfffdf;
  }

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

export const EditSvgStyled = styled(EditSvg)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  stroke: #4e4b66;
  margin-left: 7px;
`;

export const DeleteSvgStyled = styled(DeleteSvg)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  stroke: #4e4b66;
  margin-left: 7px;
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

    ${EditSvgStyled} {
      stroke: #ffffff;
    }
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

    ${DeleteSvgStyled} {
      stroke: #ffffff;
    }
  }
`;

export const ProfileCardIcon = styled.img`
  margin-left: 7px;
  width: 18px;
  height: 18px;
`;

export const AddCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 3rem;
  height: 100%;
  padding: 3.5rem 3.2rem;
`;

export const AddCardText = styled.div`
  font-size: 2rem;
  letter-spacing: 0.75px;
  text-align: center;
`;
