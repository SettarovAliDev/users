import ProfileCards from "../../components/profile-cards/ProfileCards";

import { ContainerStyled } from "../../GlobalStyles";
import {
  UserInfo,
  UserDetail,
  UserStatus,
  UserActions,
  EditSvgStyled,
  DeleteSvgStyled,
  UserHeading,
} from "./UserStyles";

const User = () => {
  return (
    <ContainerStyled>
      <UserInfo>
        <UserDetail>Sup3r_puper</UserDetail>
        <UserDetail>usermail@outlook.com</UserDetail>
        <UserStatus>user</UserStatus>
        <UserActions>
          <EditSvgStyled />
          <DeleteSvgStyled />
        </UserActions>
      </UserInfo>
      <UserHeading>Profiles:</UserHeading>
      <ProfileCards />
    </ContainerStyled>
  );
};

export default User;
