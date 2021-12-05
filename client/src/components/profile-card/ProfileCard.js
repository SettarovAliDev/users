import {
  ProfileCardStyled,
  PforileCardInfo,
  ProfileCardName,
  ProfileCardDetail,
  ProfileCardActions,
  ProfileCardEdit,
  ProfileCardDelete,
  EditSvgStyled,
  DeleteSvgStyled,
} from "./ProfileCardStyles";

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
          <EditSvgStyled />
        </ProfileCardEdit>
        <ProfileCardDelete>
          <div>Delete</div>
          <DeleteSvgStyled />
        </ProfileCardDelete>
      </ProfileCardActions>
    </ProfileCardStyled>
  );
};

export default ProfileCard;
