import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutCurrentUser } from "../../store/currentUserSlice";

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

import avatarAdmin from "../../assets/avatar-admin.png";
import avatarUser from "../../assets/avatar-user.png";
import profiles from "../../assets/profiles.svg";
import dashboard from "../../assets/dashboard.svg";
import users from "../../assets/users.svg";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser.user);
  const isAdmin = user?.roles.find((role) => role.name === "admin");

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(logoutCurrentUser());
  };

  return (
    <HeaderContainer>
      <HeaderContainerInner>
        <HeaderLeft>
          <HeaderLogo src={isAdmin ? avatarAdmin : avatarUser} alt="Avatar" />
          <HeaderUsername>{user?.username}</HeaderUsername>
        </HeaderLeft>
        <nav>
          <HeaderNavList>
            <HeaderNavItem>
              <HeaderNavLink to="/profiles">
                <div>Profiles</div>
                <img src={profiles} alt="Profiles" />
              </HeaderNavLink>
            </HeaderNavItem>
            {isAdmin && (
              <Fragment>
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
              </Fragment>
            )}
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
