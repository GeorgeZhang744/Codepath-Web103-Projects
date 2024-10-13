/* eslint-disable no-unused-vars */
import React from "react";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>Layout</div>
      <Outlet />
    </>
  );
}

export default Layout;
