import React, { useState } from "react";
import { Link } from "react-router-dom";

interface User {
  isAdmin: boolean;
}

const Header: React.FC<User> = ({ isAdmin }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-blue-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            Quick Revision
          </Link>
        </div>
        <div className="hidden sm:flex space-x-4">
          <Link
            to="/"
            className="hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            Login
          </Link>
          {isAdmin && (
            <Link
              to="/admin/add-blog"
              className="hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Add Blog
            </Link>
          )}
        </div>
        <button
          className="sm:hidden text-3xl focus:outline-none"
          onClick={toggleSidebar}
        >
          &#9776;
        </button>
      </div>
      {isSidebarOpen && (
        <div className="sm:hidden bg-blue-500 px-4 py-2 space-y-2">
          <Link
            to="/"
            className="block hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          {/* <Link
            to="/blogs"
            className="block hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            Blogs
          </Link> */}
          {isAdmin && (
            <Link
              to="/admin/add-blog"
              className="block hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Add Blog
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
