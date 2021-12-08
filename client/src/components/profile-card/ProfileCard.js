import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Spinner from "../spinner/Spinner";

import { deleteProfile } from "../../store/usersSlice";

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

const ProfileCard = ({ profile, onEditOpenHandler }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const currentUserId = useSelector((state) => state.auth.userId);

  const [isLoading, setIsLoading] = useState(false);

  const { id, name, gender, birthdate, city } = profile;

  const onDeleteProfileHandler = () => {
    dispatch(deleteProfile({ userId: userId || currentUserId, profileId: id }));
    setIsLoading(true);
  };

  const onEditClickHandler = () => {
    onEditOpenHandler(profile);
  };

  return (
    <ProfileCardStyled>
      {isLoading ? (
        <Spinner size="10rem" />
      ) : (
        <>
          <PforileCardInfo>
            <ProfileCardName>{name}</ProfileCardName>
            <ProfileCardDetail>{gender}</ProfileCardDetail>
            <ProfileCardDetail>{birthdate}</ProfileCardDetail>
            <ProfileCardDetail>{city}</ProfileCardDetail>
          </PforileCardInfo>
          <ProfileCardActions>
            <ProfileCardEdit onClick={onEditClickHandler}>
              <div>Edit</div>
              <EditSvgStyled />
            </ProfileCardEdit>
            <ProfileCardDelete onClick={onDeleteProfileHandler}>
              <div>Delete</div>
              <DeleteSvgStyled />
            </ProfileCardDelete>
          </ProfileCardActions>
        </>
      )}
    </ProfileCardStyled>
  );
};

export default ProfileCard;
