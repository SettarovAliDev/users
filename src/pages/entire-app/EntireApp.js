import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/header/Header";

const EntireApp = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
};

export default EntireApp;
