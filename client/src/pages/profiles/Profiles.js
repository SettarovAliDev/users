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
  return (
    <ContainerStyled>
      <ProfilesInfo>
        <ProfilesDetail>Sup3r_puper</ProfilesDetail>
        <ProfilesDetail>useremail@outlook.com</ProfilesDetail>
        <ProfilesStatus>user</ProfilesStatus>
        <ProfilesActions>
          <EditSvgStyled />
          <DeleteSvgStyled />
        </ProfilesActions>
      </ProfilesInfo>
      <ProfilesHeading>Profiles:</ProfilesHeading>
      <ProfileCards />
    </ContainerStyled>
  );
};

export default Profiles;
