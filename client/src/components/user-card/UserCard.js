import React from "react";
import { useNavigate } from "react-router-dom";

import {
  UserCardContainer,
  UserCardHeading,
  UserCardSpan,
} from "./UserCardStyles";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <UserCardContainer onClick={() => navigate(`${user.id}`)}>
      <UserCardHeading>{user.username}</UserCardHeading>
      <UserCardSpan>{user.email}</UserCardSpan>
      <UserCardSpan>3 profiles</UserCardSpan>
    </UserCardContainer>
  );
};

export default UserCard;