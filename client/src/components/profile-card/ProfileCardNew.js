import {
  ProfileCardStyled,
  AddCardContainer,
  AddCardText,
} from "./ProfileCardStyles";

import { ReactComponent as AddCard } from "../../assets/add-card.svg";

const ProfileCardNew = () => {
  return (
    <ProfileCardStyled style={{ position: "relative" }}>
      <AddCardContainer>
        <AddCard />
        <AddCardText>Crearte new profile</AddCardText>
      </AddCardContainer>
    </ProfileCardStyled>
  );
};

export default ProfileCardNew;
