import ProfileCards from "../../components/profile-cards/ProfileCards";

import { ContainerStyled } from "../../GlobalStyles";
import {
  UserInfo,
  UserDetail,
  UserStatus,
  UserActions,
  UserActionImage,
  UserHeading,
} from "./UserStyles";

import editImg from "../../assets/edit.svg";
import deleteImg from "../../assets/delete.svg";

const User = () => {
  return (
    <ContainerStyled>
      <UserInfo>
        <UserDetail>Sup3r_puper</UserDetail>
        <UserDetail>usermail@outlook.com</UserDetail>
        <UserStatus>user</UserStatus>
        <UserActions>
          <UserActionImage src={editImg} />
          <UserActionImage src={deleteImg} />
        </UserActions>
      </UserInfo>
      <UserHeading>Profiles:</UserHeading>
      <ProfileCards />
    </ContainerStyled>
  );
};

export default User;
