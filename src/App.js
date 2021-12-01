import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import EntireApp from "./pages/entire-app/EntireApp";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import User from "./pages/users/User";

import { GlobalStyles } from "./GlobalStyles";

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Navigate to="sign-in" />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/" element={<EntireApp />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<User />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
