import { useSelector } from "react-redux";

import { ContainerStyled, MainHeading } from "../../GlobalStyles";

import {
  DashboardCards,
  DashboardCard,
  DashboardCardHeading,
  DashboardCardQuantity,
} from "./DashboardStyles";

const Dashboard = () => {
  const users = useSelector((state) => state.users.entities);

  const usersQuantity = Object.values(users).length;
  const profilesQuantity = Object.values(users)
    .map((user) => Object.values(user.profiles).length)
    .reduce((a, b) => a + b);

  return (
    <ContainerStyled>
      <MainHeading>Dashboard:</MainHeading>
      <DashboardCards>
        <DashboardCard>
          <DashboardCardHeading>Users:</DashboardCardHeading>
          <DashboardCardQuantity>{usersQuantity}</DashboardCardQuantity>
        </DashboardCard>
        <DashboardCard>
          <DashboardCardHeading>Profiles:</DashboardCardHeading>
          <DashboardCardQuantity>{profilesQuantity}</DashboardCardQuantity>
        </DashboardCard>
        <DashboardCard>
          <DashboardCardHeading>
            Profiles over 18 years old:
          </DashboardCardHeading>
          <DashboardCardQuantity>FIX THIS</DashboardCardQuantity>
        </DashboardCard>
      </DashboardCards>
    </ContainerStyled>
  );
};

export default Dashboard;
