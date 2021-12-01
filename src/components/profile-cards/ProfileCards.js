import ProfileCard from "../profile-card/ProfileCard";

import { ProfileCardsStyled } from "./ProfileCardsStyles";

const ProfileCards = () => {
  return (
    <ProfileCardsStyled>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </ProfileCardsStyled>
  );
};

export default ProfileCards;
