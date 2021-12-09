import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutCurrentUser } from "../../store/authSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId, isAdmin } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.users.entities[userId]);

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(logoutCurrentUser());
  };

  return (
    <HeaderContainer>
      <HeaderContainerInner>
        <HeaderLeft onClick={() => navigate("/")}>
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
