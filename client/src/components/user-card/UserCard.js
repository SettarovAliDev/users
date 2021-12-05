import React from "react";

import {
  UserCardContainer,
  UserCardHeading,
  UserCardSpan,
} from "./UserCardStyles";

const UserCard = ({ user }) => {
  return (
    <UserCardContainer>
      <UserCardHeading>{user.username}</UserCardHeading>
      <UserCardSpan>{user.email}</UserCardSpan>
      <UserCardSpan>3 profiles</UserCardSpan>
    </UserCardContainer>
  );
};

export default UserCard;
