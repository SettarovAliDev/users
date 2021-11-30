import styled from "styled-components";

export const DashboardHeading = styled.h2`
  font-size: 3.6rem;
  font-weight: 400;
  letter-spacing: 1px;
  padding: 6rem 0;
`;

export const DashboardCards = styled.ul`
  display: flex;
`;

export const DashboardCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 7.5rem;
  border-radius: 1.6rem;
  background-color: var(--background-color-white);

  &:not(:last-child) {
    margin-right: 8rem;
  }
`;

export const DashboardCardHeading = styled.div`
  font-size: 3.6rem;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 5rem;
  line-height: 1;
`;

export const DashboardCardQuantity = styled.div`
  font-size: 4.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1;
`;
