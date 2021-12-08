import { useSelector } from "react-redux";

import Spinner from "../spinner/Spinner";

import {
  ProfileCardStyled,
  AddCardContainer,
  AddCardText,
} from "./ProfileCardStyles";

import { ReactComponent as AddCard } from "../../assets/add-card.svg";

const ProfileCardNew = ({ onEditOpenHandler }) => {
  const addProfileStatus = useSelector((state) => state.users.addProfileStatus);

  return (
    <ProfileCardStyled
      onClick={() => onEditOpenHandler(null)}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <AddCardContainer>
        {addProfileStatus === "loading" ? (
          <Spinner size="10rem" />
        ) : (
          <>
            <AddCard />
            <AddCardText>Crearte new profile</AddCardText>
          </>
        )}
      </AddCardContainer>
    </ProfileCardStyled>
  );
};

export default ProfileCardNew;
