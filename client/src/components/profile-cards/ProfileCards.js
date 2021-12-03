import ProfileCard from "../profile-card/ProfileCard";
import ProfileCardNew from "../profile-card/ProfileCardNew";

import { ProfileCardsStyled } from "./ProfileCardsStyles";

const ProfileCards = () => {
  return (
    <ProfileCardsStyled>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCardNew />
    </ProfileCardsStyled>
  );
};

export default ProfileCards;
