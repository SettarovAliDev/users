import styled from "styled-components";

import { ReactComponent as EditSvg } from "../../assets/edit.svg";
import { ReactComponent as DeleteSvg } from "../../assets/delete.svg";

export const ProfilesInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem;

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const ProfilesDetail = styled.div`
  font-size: 3.2rem;
  line-height: 1.5;
  font-weight: 400;
`;

export const ProfilesStatus = styled.div`
  font-size: 2.4rem;
  line-height: 1.5;
  font-weight: 400;
`;

export const ProfilesActions = styled.div`
  display: flex;
`;

export const EditSvgStyled = styled(EditSvg)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  stroke: #14142b;
  margin-right: 3.5rem;

  &:hover {
    stroke: #624af2;
  }
`;

export const DeleteSvgStyled = styled(DeleteSvg)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  stroke: #14142b;

  &:hover {
    stroke: #eb0055;
  }
`;

export const ProfilesHeading = styled.h2`
  font-size: 3.6rem;
  font-weight: 400;
  letter-spacing: 1px;
  padding-bottom: 6rem;

  @media screen and (max-width: 1679px) {
    text-align: center;
  }
`;
