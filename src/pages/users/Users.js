import Header from "../../components/header/Header";
import { ContainerStyled, MainHeading } from "../../GlobalStyles";

import {
  UsersCards,
  UsersCard,
  UsersCardHeading,
  UsersCardSpan,
} from "./UsersStyles";

const Users = () => {
  return (
    <>
      <Header />
      <ContainerStyled>
        <MainHeading>Users:</MainHeading>
        <UsersCards>
          <UsersCard>
            <UsersCardHeading>1White</UsersCardHeading>
            <UsersCardSpan>danilo.bilyi@gmail.com</UsersCardSpan>
            <UsersCardSpan>3 profiles</UsersCardSpan>
          </UsersCard>
          <UsersCard>
            <UsersCardHeading>1White</UsersCardHeading>
            <UsersCardSpan>danilo.bilyi@gmail.com</UsersCardSpan>
            <UsersCardSpan>3 profiles</UsersCardSpan>
          </UsersCard>
          <UsersCard>
            <UsersCardHeading>1White</UsersCardHeading>
            <UsersCardSpan>danilo.bilyi@gmail.com</UsersCardSpan>
            <UsersCardSpan>3 profiles</UsersCardSpan>
          </UsersCard>
          <UsersCard>
            <UsersCardHeading>1White</UsersCardHeading>
            <UsersCardSpan>danilo.bilyi@gmail.com</UsersCardSpan>
            <UsersCardSpan>3 profiles</UsersCardSpan>
          </UsersCard>
          <UsersCard>
            <UsersCardHeading>1White</UsersCardHeading>
            <UsersCardSpan>danilo.bilyi@gmail.com</UsersCardSpan>
            <UsersCardSpan>3 profiles</UsersCardSpan>
          </UsersCard>
          <UsersCard>
            <UsersCardHeading>1White</UsersCardHeading>
            <UsersCardSpan>danilo.bilyi@gmail.com</UsersCardSpan>
            <UsersCardSpan>3 profiles</UsersCardSpan>
          </UsersCard>
          <UsersCard>
            <UsersCardHeading>1White</UsersCardHeading>
            <UsersCardSpan>danilo.bilyi@gmail.com</UsersCardSpan>
            <UsersCardSpan>3 profiles</UsersCardSpan>
          </UsersCard>
          <UsersCard>
            <UsersCardHeading>1White</UsersCardHeading>
            <UsersCardSpan>danilo.bilyi@gmail.com</UsersCardSpan>
            <UsersCardSpan>3 profiles</UsersCardSpan>
          </UsersCard>
          <UsersCard>
            <UsersCardHeading>1White</UsersCardHeading>
            <UsersCardSpan>danilo.bilyi@gmail.com</UsersCardSpan>
            <UsersCardSpan>3 profiles</UsersCardSpan>
          </UsersCard>
        </UsersCards>
      </ContainerStyled>
    </>
  );
};

export default Users;
