import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Modal from "../../components/modal/Modal";
import EditProfile from "../../components/edit-profile/EditProfile";
import ProfileCards from "../../components/profile-cards/ProfileCards";

import { ContainerStyled } from "../../GlobalStyles";
import {
  ProfilesInfo,
  ProfilesDetail,
  ProfilesStatus,
  ProfilesActions,
  EditSvgStyled,
  DeleteSvgStyled,
  ProfilesHeading,
} from "./ProfilesStyles";

const Profiles = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const params = useParams();

  const { userId } = params;

  const currentUser = useSelector((state) => state?.currentUser?.user);
  const uniqueUser = useSelector((state) => state?.users?.entities?.[userId]);

  const user = uniqueUser || currentUser;

  const isAdmin = user?.roles.find((role) => role.name === "admin");

  const onOpenEditClickHandler = () => {
    setIsEditOpen(true);
  };

  const onEditCloseHandler = () => {
    setIsEditOpen(false);
  };

  return (
    <Fragment>
      {isEditOpen && (
        <Modal>
          <EditProfile onEditCloseHandler={onEditCloseHandler} />
        </Modal>
      )}
      <ContainerStyled>
        <ProfilesInfo>
          <ProfilesDetail>{user.username}</ProfilesDetail>
          <ProfilesDetail>{user.email}</ProfilesDetail>
          <ProfilesStatus>{isAdmin ? "admin" : "user"}</ProfilesStatus>
          <ProfilesActions>
            <EditSvgStyled />
            <DeleteSvgStyled />
          </ProfilesActions>
        </ProfilesInfo>
        <ProfilesHeading>Profiles:</ProfilesHeading>
        <ProfileCards
          profiles={user.profiles}
          onOpenEditClickHandler={onOpenEditClickHandler}
        />
      </ContainerStyled>
    </Fragment>
  );
};

export default Profiles;
