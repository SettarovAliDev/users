import { useSelector } from "react-redux";

import UserCard from "../../components/user-card/UserCard";

import { ContainerStyled, MainHeading } from "../../GlobalStyles";
import { UsersCards } from "./UsersStyles";

const Users = () => {
  const users = useSelector((state) => state.users.entities);

  return (
    <ContainerStyled>
      <MainHeading>Users:</MainHeading>
      <UsersCards>
        {Object.values(users).map((user) => (
          <UserCard user={user} />
        ))}
      </UsersCards>
    </ContainerStyled>
  );
};

export default Users;
