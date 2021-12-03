import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import EntireApp from "./pages/entire-app/EntireApp";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import User from "./pages/users/User";

import { GlobalStyles } from "./GlobalStyles";

import { fetchUsers } from "./store/users/usersSlice";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Fragment>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Navigate to="sign-in" />} />
        <Route
          path="sign-in"
          element={currentUser ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route
          path="sign-up"
          element={currentUser ? <Navigate to="/dashboard" /> : <SignUp />}
        />

        {currentUser && (
          <Route path="/" element={<EntireApp />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:userId" element={<User />} />
          </Route>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Fragment>
  );
};

export default App;
