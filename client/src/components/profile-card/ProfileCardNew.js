import { Fragment } from "react";
import { useSelector } from "react-redux";

import Spinner from "../spinner/Spinner";

import {
  ProfileCardStyled,
  AddCardContainer,
  AddCardText,
} from "./ProfileCardStyles";

import { ReactComponent as AddCard } from "../../assets/add-card.svg";

const ProfileCardNew = ({ onEditOpenHandler }) => {
  const { addProfileLoading } = useSelector((state) => state.users.loaders);

  return (
    <ProfileCardStyled
      onClick={() => onEditOpenHandler(null)}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <AddCardContainer>
        {addProfileLoading ? (
          <Spinner size="10rem" />
        ) : (
          <Fragment>
            <AddCard />
            <AddCardText>Crearte new profile</AddCardText>
          </Fragment>
        )}
      </AddCardContainer>
    </ProfileCardStyled>
  );
};

export default ProfileCardNew;
