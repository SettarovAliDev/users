import { ContainerStyled } from "../../GlobalStyles";
import { MainHeading } from "../../GlobalStyles";

import {
  DashboardCards,
  DashboardCard,
  DashboardCardHeading,
  DashboardCardQuantity,
} from "./DashboardStyles";

const Dashboard = () => {
  return (
    <ContainerStyled>
      <MainHeading>Dashboard:</MainHeading>
      <DashboardCards>
        <DashboardCard>
          <DashboardCardHeading>Users:</DashboardCardHeading>
          <DashboardCardQuantity>13</DashboardCardQuantity>
        </DashboardCard>
        <DashboardCard>
          <DashboardCardHeading>Profiles:</DashboardCardHeading>
          <DashboardCardQuantity>27</DashboardCardQuantity>
        </DashboardCard>
        <DashboardCard>
          <DashboardCardHeading>
            Profiles over 18 years old:
          </DashboardCardHeading>
          <DashboardCardQuantity>20</DashboardCardQuantity>
        </DashboardCard>
      </DashboardCards>
    </ContainerStyled>
  );
};

export default Dashboard;
