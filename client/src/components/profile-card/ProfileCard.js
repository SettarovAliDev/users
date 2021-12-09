import { Fragment, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { userId } = useParams();

  const currentUserId = useSelector((state) => state.auth.userId);

  const { id, name, gender, birthdate, city } = profile;

  const dateFigures = Date.parse(birthdate);
  const date = new Date(dateFigures);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dayFormat = day < 10 ? `0${day}` : `${day}`;
  const monthFormat = month < 10 ? `0${month}` : `${month}`;

  const dateString = `${dayFormat}.${monthFormat}.${year}`;

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
        <Fragment>
          <PforileCardInfo>
            <ProfileCardName>{name}</ProfileCardName>
            <ProfileCardDetail>{gender}</ProfileCardDetail>
            <ProfileCardDetail>{dateString}</ProfileCardDetail>
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
        </Fragment>
      )}
    </ProfileCardStyled>
  );
};

export default ProfileCard;
