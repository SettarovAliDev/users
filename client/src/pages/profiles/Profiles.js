import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
  const { userId } = useParams();

  const { userId: currentUserId } = useSelector((state) => state.auth);

  const uniqueUser = useSelector((state) => state?.users?.entities?.[userId]);
  const currentUser = useSelector(
    (state) => state?.users?.entities?.[currentUserId]
  );

  const user = uniqueUser || currentUser;

  const isAdmin = user?.roles.find((role) => role.name === "admin");

  return (
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
      <ProfileCards profiles={user.profiles} />
    </ContainerStyled>
  );
};

export default Profiles;
