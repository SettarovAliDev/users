import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";

import { GlobalStyles } from "./GlobalStyles";

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Navigate to="sign-in" />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
