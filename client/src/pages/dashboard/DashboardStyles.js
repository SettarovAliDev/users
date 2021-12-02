import styled from "styled-components";

export const DashboardCards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 6rem;
  row-gap: 6rem;
`;

export const DashboardCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 7.5rem;
  border-radius: 1.6rem;
  background-color: var(--background-color-white);
`;

export const DashboardCardHeading = styled.h3`
  font-size: 3.6rem;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 5rem;
  line-height: 1;
`;

export const DashboardCardQuantity = styled.span`
  font-size: 4.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1;
`;
