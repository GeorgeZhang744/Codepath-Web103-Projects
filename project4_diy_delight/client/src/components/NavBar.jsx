/* eslint-disable no-unused-vars */
import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-neutral text-white top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-6">
        <div className="flex items-center">
          <span className="text-3xl font-bold">Bolt Bucket</span>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/">
            <button className="btn bg-primary text-white text-xl px-6 py-2 rounded-sm hover:bg-black border-none">
              CUSTOMIZE
            </button>
          </Link>
          <Link to={"/shirts"}>
            <button className="btn bg-primary text-white text-xl px-6 py-2 rounded-sm hover:bg-black border-none">
              VIEW SHIRTS
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
