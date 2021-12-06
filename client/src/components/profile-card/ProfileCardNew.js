import {
  ProfileCardStyled,
  AddCardContainer,
  AddCardText,
} from "./ProfileCardStyles";

import { ReactComponent as AddCard } from "../../assets/add-card.svg";

const ProfileCardNew = ({ onOpenEditClickHandler }) => {
  return (
    <ProfileCardStyled
      onClick={onOpenEditClickHandler}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <AddCardContainer>
        <AddCard />
        <AddCardText>Crearte new profile</AddCardText>
      </AddCardContainer>
    </ProfileCardStyled>
  );
};

export default ProfileCardNew;
