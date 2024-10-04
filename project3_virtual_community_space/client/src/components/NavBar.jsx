/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 w-full fixed top-0 left-0 z-10">
      <div className="flex flex-wrap justify-between items-center max-w-screen-xl mx-auto p-4">
        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Virtual Community Space</span>
        <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link to="/">
              <button className="py-3 px-5 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/events">
              <button className="py-3 px-5 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                Events
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
