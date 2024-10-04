/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="w-full mx-auto px-8 py-20">
      <div className="flex flex-col items-center justify-center w-full dark:bg-gray-900 text-gray-800 dark:text-white px-8 mt-8">
        <div className="w-full text-center p-10 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-8xl font-bold mb-6">404</h1>
          <h2 className="text-4xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-lg mb-8">The page you are looking for does not exist or has been moved.</p>
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded">Go to Homepage</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
