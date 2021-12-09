import { Fragment, useState } from "react";

import Modal from "../modal/Modal";
import EditProfile from "../edit-form/EditProfile";

import ProfileCard from "../profile-card/ProfileCard";
import ProfileCardNew from "../profile-card/ProfileCardNew";

import { ProfileCardsStyled } from "./ProfileCardsStyles";

const ProfileCards = ({ profiles }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [previousData, setPreviousData] = useState(null);

  const onEditOpenHandler = (prev) => {
    setIsEditOpen(true);
    setPreviousData(prev);
  };

  const onEditCloseHandler = () => {
    setIsEditOpen(false);
  };

  return (
    <Fragment>
      {isEditOpen && (
        <Modal>
          <EditProfile
            onEditCloseHandler={onEditCloseHandler}
            previousData={previousData}
          />
        </Modal>
      )}
      <ProfileCardsStyled>
        {Object.values(profiles).map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onEditOpenHandler={onEditOpenHandler}
          />
        ))}
        <ProfileCardNew onEditOpenHandler={onEditOpenHandler} />
      </ProfileCardsStyled>
    </Fragment>
  );
};

export default ProfileCards;
