import {
  ProfileCardStyled,
  PforileCardInfo,
  ProfileCardName,
  ProfileCardDetail,
  ProfileCardActions,
  ProfileCardEdit,
  ProfileCardDelete,
} from "./ProfileCardStyles";

import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

const ProfileCard = () => {
  return (
    <ProfileCardStyled>
      <PforileCardInfo>
        <ProfileCardName>Danylo Bilyi</ProfileCardName>
        <ProfileCardDetail>male</ProfileCardDetail>
        <ProfileCardDetail>25.03.2003</ProfileCardDetail>
        <ProfileCardDetail>Kyiv</ProfileCardDetail>
      </PforileCardInfo>
      <ProfileCardActions>
        <ProfileCardEdit>
          <div>Edit</div>
          <EditIcon />
        </ProfileCardEdit>
        <ProfileCardDelete>
          <div>Delete</div>
          <DeleteIcon />
        </ProfileCardDelete>
      </ProfileCardActions>
    </ProfileCardStyled>
  );
};

export default ProfileCard;
