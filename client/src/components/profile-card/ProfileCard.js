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

const ProfileCard = ({ profile }) => {
  const { name, gender, birthdate, city } = profile;

  return (
    <ProfileCardStyled>
      <PforileCardInfo>
        <ProfileCardName>{name}</ProfileCardName>
        <ProfileCardDetail>{gender}</ProfileCardDetail>
        <ProfileCardDetail>{birthdate}</ProfileCardDetail>
        <ProfileCardDetail>{city}</ProfileCardDetail>
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
