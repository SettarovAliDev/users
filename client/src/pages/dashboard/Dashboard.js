import { useSelector } from 'react-redux';

import { ContainerStyled, MainHeading } from '../../GlobalStyles';

import {
  DashboardCards,
  DashboardCard,
  DashboardCardHeading,
  DashboardCardQuantity,
} from './DashboardStyles';

export const calculateAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const Dashboard = () => {
  const users = useSelector((state) => state.users.entities);

  const usersValues = Object.values(users);
  const usersQuantity = usersValues.length;
  const profilesQuantity = usersValues
    .map((user) => Object.values(user.profiles).length)
    .reduce((a, b) => a + b);
  const profilesOver18 = usersValues
    .flatMap((user) => Object.values(user.profiles))
    .filter((profile) => calculateAge(Date.parse(profile.birthdate)) >= 18);

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
          <DashboardCardQuantity>{profilesOver18.length}</DashboardCardQuantity>
        </DashboardCard>
      </DashboardCards>
    </ContainerStyled>
  );
};

export default Dashboard;
