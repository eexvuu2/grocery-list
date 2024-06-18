import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Landing = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    history.push(`/`);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const loginRegLink = (
    <ul className="flex flex-col lg:flex-row lg:space-x-4">
      <li>
        <Link
          to="/login"
          className="text-white hover:text-gray-300"
          onClick={closeMenu}
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          to="/register"
          className="text-white hover:text-gray-300"
          onClick={closeMenu}
        >
          Register
        </Link>
      </li>
    </ul>
  );

  const userLink = (
    <ul className="flex flex-col lg:flex-row lg:space-x-4 text-white">
      <li>
        <Link
          to="/todo-list"
          className="hover:text-gray-300"
          onClick={closeMenu}
        >
          Grocery List
        </Link>
      </li>
      <li>
        <Link to="/profile" className="hover:text-gray-300" onClick={closeMenu}>
          User
        </Link>
      </li>
      <li>
        <a
          href="/"
          onClick={(e) => {
            logOut(e);
            closeMenu();
          }}
          className="hover:text-gray-300"
        >
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="text-white bg-[#398159] text-lg">
      <div className="p-4 container mx-auto">
        <div className="flex justify-between items-center">
          <button
            className="lg:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="hidden lg:flex justify-between items-center w-full">
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/"
                  className="text-white font-bold hover:text-gray-300"
                >
                  Home
                </Link>
              </li>
            </ul>
            {localStorage.usertoken ? userLink : loginRegLink}
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} lg:hidden mt-4`}>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-white font-bold hover:text-gray-300"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Landing);
