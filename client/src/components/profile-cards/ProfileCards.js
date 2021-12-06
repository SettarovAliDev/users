import { useSelector } from "react-redux";

import ProfileCard from "../profile-card/ProfileCard";
import ProfileCardNew from "../profile-card/ProfileCardNew";

import { ProfileCardsStyled } from "./ProfileCardsStyles";

const ProfileCards = ({ onOpenEditClickHandler }) => {
  const profiles = useSelector((state) => state.currentUser.user.profiles);

  return (
    <ProfileCardsStyled>
      {profiles.map((profile) => (
        <ProfileCard
          profile={profile}
          onOpenEditClickHandler={onOpenEditClickHandler}
        />
      ))}
      <ProfileCardNew onOpenEditClickHandler={onOpenEditClickHandler} />
    </ProfileCardsStyled>
  );
};

export default ProfileCards;
