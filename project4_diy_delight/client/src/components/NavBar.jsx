/* eslint-disable no-unused-vars */
import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-neutral text-white top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-6">
        <div className="flex items-center">
          <h1 className="flex text-4xl font-bold">
            <div aria-label="t-shirt" className="mb-3">
              👕
            </div>
            <div className="my-auto">DIY T-Shirts</div>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/">
            <button className="btn bg-primary text-white text-xl px-6 py-2 rounded-md hover:bg-black">CUSTOMIZE</button>
          </Link>
          <Link to={"/shirts"}>
            <button className="btn bg-primary text-white text-xl px-6 py-2 rounded-md hover:bg-black">VIEW SHIRTS</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
