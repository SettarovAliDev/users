import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Spinner from '../../components/spinner/Spinner';
import Modal from '../../components/modal/Modal';
import EditUser from '../../components/edit-form/EditUser';
import ProfileCards from '../../components/profile-cards/ProfileCards';

import { deleteUser } from '../../store/usersSlice';

import { ContainerStyled } from '../../GlobalStyles';
import {
  ProfilesInfo,
  ProfilesDetail,
  ProfilesStatus,
  ProfilesActions,
  EditSvgStyled,
  DeleteSvgStyled,
  ProfilesHeading,
} from './ProfilesStyles';

const Profiles = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const dispatch = useDispatch();

  const { userId } = useParams();

  const { userId: currentUserId } = useSelector((state) => state?.auth);
  const { editUserLoading } = useSelector((state) => state?.users?.loaders);
  const uniqueUser = useSelector((state) => state?.users?.entities?.[userId]);
  const currentUser = useSelector(
    (state) => state?.users?.entities?.[currentUserId]
  );

  const user = uniqueUser || currentUser;

  const isAdmin = user?.roles.find((role) => role.name === 'admin');

  const onEditOpenHandler = () => {
    setIsEditOpen(true);
  };

  const onEditCloseHandler = () => {
    setIsEditOpen(false);
  };

  const onDeleteUserHandler = () => {
    dispatch(deleteUser({ userId: user.id, currentUserId }));
  };

  return (
    <Fragment>
      {isEditOpen && (
        <Modal>
          <EditUser
            onEditCloseHandler={onEditCloseHandler}
            user={{
              username: user.username,
              email: user.email,
              isAdmin,
            }}
          />
        </Modal>
      )}
      <ContainerStyled>
        <ProfilesInfo>
          {editUserLoading ? (
            <Spinner size="7rem" />
          ) : (
            <Fragment>
              <ProfilesDetail>{user.username}</ProfilesDetail>
              <ProfilesDetail>{user.email}</ProfilesDetail>
              <ProfilesStatus>{isAdmin ? 'admin' : 'user'}</ProfilesStatus>
              <ProfilesActions>
                <EditSvgStyled onClick={onEditOpenHandler} />
                <DeleteSvgStyled onClick={onDeleteUserHandler} />
              </ProfilesActions>
            </Fragment>
          )}
        </ProfilesInfo>

        <ProfilesHeading>Profiles:</ProfilesHeading>
        <ProfileCards profiles={user.profiles} />
      </ContainerStyled>
    </Fragment>
  );
};

export default Profiles;
