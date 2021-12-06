import ProfileCard from "../profile-card/ProfileCard";
import ProfileCardNew from "../profile-card/ProfileCardNew";

import { ProfileCardsStyled } from "./ProfileCardsStyles";

const ProfileCards = ({ onOpenEditClickHandler, profiles }) => {
  return (
    <ProfileCardsStyled>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onOpenEditClickHandler={onOpenEditClickHandler}
        />
      ))}
      <ProfileCardNew onOpenEditClickHandler={onOpenEditClickHandler} />
    </ProfileCardsStyled>
  );
};

export default ProfileCards;
