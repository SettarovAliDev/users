import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Spinner from "./components/spinner/Spinner";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import EntireApp from "./pages/entire-app/EntireApp";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import Profiles from "./pages/profiles/Profiles";

import { GlobalStyles } from "./GlobalStyles";

import { loginUserByToken } from "./store/currentUser/currentUserSlice";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(loginUserByToken());
  }, [dispatch]);

  return (
    <Fragment>
      <GlobalStyles />
      {currentUser.status === "loading" ? (
        <Spinner size="7rem" big />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="sign-in" />} />
          <Route
            path="sign-in"
            element={
              currentUser.user ? <Navigate to="/profiles" /> : <SignIn />
            }
          />
          <Route
            path="sign-up"
            element={
              currentUser.user ? <Navigate to="/profiles" /> : <SignUp />
            }
          />

          {currentUser.user && (
            <Route path="/" element={<EntireApp />}>
              {currentUser?.user?.roles.includes("ROLE_ADMIN") && (
                <Fragment>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="users/:userId" element={<Profiles />} />
                </Fragment>
              )}
              <Route path="profiles" element={<Profiles />} />
            </Route>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </Fragment>
  );
};

export default App;
