import { useDispatch } from "react-redux";
import { logoutCurrentUser } from "../../store/currentUser/currentUserSlice";

import {
  HeaderContainer,
  HeaderContainerInner,
  HeaderLeft,
  HeaderNavList,
  HeaderNavItem,
  HeaderLogo,
  HeaderUsername,
  HeaderNavLink,
} from "./HeaderStyles";

import avatar from "../../assets/avatar.png";
import profiles from "../../assets/profiles.svg";
import dashboard from "../../assets/dashboard.svg";
import users from "../../assets/users.svg";

const Header = () => {
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(logoutCurrentUser());
  };

  return (
    <HeaderContainer>
      <HeaderContainerInner>
        <HeaderLeft>
          <HeaderLogo src={avatar} alt="User avatar" />
          <HeaderUsername>1White</HeaderUsername>
        </HeaderLeft>
        <nav>
          <HeaderNavList>
            <HeaderNavItem>
              <HeaderNavLink to="/profiles">
                <div>Profiles</div>
                <img src={profiles} alt="Profiles" />
              </HeaderNavLink>
            </HeaderNavItem>
            <HeaderNavItem>
              <HeaderNavLink to="/dashboard">
                <div>Dashboard</div>
                <img src={dashboard} alt="Dashboard" />
              </HeaderNavLink>
            </HeaderNavItem>
            <HeaderNavItem>
              <HeaderNavLink to="/users">
                <div>Users</div>
                <img src={users} alt="Users" />
              </HeaderNavLink>
            </HeaderNavItem>
            <HeaderNavItem>
              <HeaderNavLink to="/sign-in" onClick={onLogoutHandler}>
                Log out
              </HeaderNavLink>
            </HeaderNavItem>
          </HeaderNavList>
        </nav>
      </HeaderContainerInner>
    </HeaderContainer>
  );
};

export default Header;
