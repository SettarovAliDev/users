import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderContainer = styled.header`
  background-color: #f7f7fc;
  box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.04);
`;

export const HeaderContainerInner = styled.div`
  display: flex;
  height: 8rem;
  justify-content: space-between;
  align-items: center;
  max-width: 168rem;
  margin: 0 auto;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderNavList = styled.ul`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.75px;

  & > *:not(:last-child) {
    margin-right: 4.5rem;
  }

  & > *:last-child {
    margin-left: 5.5rem;
  }
`;

export const HeaderNavItem = styled.li`
  list-style: none;
`;

export const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: var(--text-color-dark-2);

  &:hover,
  &:active {
    color: var(--text-color-dark-1);
  }

  & > *:first-child {
    margin-right: 1rem;
  }
`;

export const HeaderLogo = styled.img`
  display: block;
  height: 4.8rem;
  width: 4.8rem;
  margin-right: 2.5rem;
`;

export const HeaderUsername = styled.div`
  font-weight: 600;
  font-size: 1.8rem;
  letter-spacing: 0.75px;
`;
