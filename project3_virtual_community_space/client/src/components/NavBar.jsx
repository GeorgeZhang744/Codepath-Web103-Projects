/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <div>Title</div>
      <div>
        <Link to="/">
          <button>
            HOME
          </button>
        </Link>
        <Link to="/events">
          <button>
            EVENTS
          </button>
        </Link>
      </div>
    </nav>
  );
}
