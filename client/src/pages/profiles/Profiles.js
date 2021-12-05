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

  console.log(user);

  const onOpenEditClickHandler = () => {
    setIsEditOpen(true);
  };

  const onEditSubmitHandler = () => {
    setIsEditOpen(false);
  };

  return (
    <Fragment>
      {isEditOpen && (
        <Modal>
          <EditProfile />
        </Modal>
      )}
      <ContainerStyled>
        <ProfilesInfo>
          <ProfilesDetail>{user.username}</ProfilesDetail>
          <ProfilesDetail>{user.email}</ProfilesDetail>
          <ProfilesStatus>user</ProfilesStatus>
          <ProfilesActions>
            <EditSvgStyled onClick={onOpenEditClickHandler} />
            <DeleteSvgStyled />
          </ProfilesActions>
        </ProfilesInfo>
        <ProfilesHeading>Profiles:</ProfilesHeading>
        <ProfileCards />
      </ContainerStyled>
    </Fragment>
  );
};

export default Profiles;
