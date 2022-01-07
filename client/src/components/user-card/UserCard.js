import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  UserCardContainer,
  UserCardHeading,
  UserCardSpan,
} from './UserCardStyles';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <UserCardContainer
      data-testid="card"
      onClick={() => navigate(`${user.id}`)}
    >
      <UserCardHeading data-testid="username">{user.username}</UserCardHeading>
      <UserCardSpan data-testid="email">{user.email}</UserCardSpan>
      <UserCardSpan data-testid="profiles">
        {Object.values(user.profiles).length} profiles
      </UserCardSpan>
    </UserCardContainer>
  );
};

export default UserCard;
