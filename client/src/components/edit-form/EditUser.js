import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { editUser } from '../../store/usersSlice';

import {
  EditContainer,
  EditForm,
  EditRadio,
  ButtonsContainer,
  CheckSvgStyled,
  CloseSvgStyled,
} from './EditStyles';

const EditUser = ({ onEditCloseHandler, user }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.isAdmin ? 'admin' : 'user' || '');

  const { userId } = useParams();

  const dispatch = useDispatch();

  const { userId: currentUserId, isAdmin } = useSelector((state) => state.auth);

  const onChangeUsernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onChangeRoleHandler = (e) => {
    setRole(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(
      editUser({
        username,
        email,
        roles: role === 'admin' ? ['user', 'admin'] : ['user'],
        userId: userId || currentUserId,
      })
    );

    onEditCloseHandler();
  };

  return (
    <EditContainer>
      <EditForm autocomplete="off" onSubmit={onSubmitHandler}>
        <label htmlFor="username">username:</label>
        <input
          value={username}
          onChange={onChangeUsernameHandler}
          id="username"
          type="text"
          autoComplete="off"
          required
        />
        <label htmlFor="email">email:</label>
        <input
          value={email}
          onChange={onChangeEmailHandler}
          id="email"
          type="email"
          autoComplete="off"
          required
        />
        <label htmlFor="role">role:</label>
        <EditRadio>
          <input
            data-testid="role-u"
            type="radio"
            id="role-u"
            name="role"
            value="user"
            checked={role === 'user'}
            onChange={onChangeRoleHandler}
            required
            disabled={!isAdmin}
          />
          <label htmlFor="role-u">user</label>
          <input
            data-testid="role-a"
            type="radio"
            id="role-a"
            name="role"
            value="admin"
            checked={role === 'admin'}
            onChange={onChangeRoleHandler}
            required
            disabled={!isAdmin}
          />
          <label htmlFor="role-a">admin</label>
        </EditRadio>
        <ButtonsContainer>
          <button data-testid="submit-edit-user" type="submit">
            <CheckSvgStyled />
          </button>
          <button type="button" onClick={onEditCloseHandler}>
            <CloseSvgStyled />
          </button>
        </ButtonsContainer>
      </EditForm>
    </EditContainer>
  );
};

export default EditUser;
