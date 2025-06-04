import React from 'react';
import logo from '../assets/images/logo.png';
import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center text-sl p-5 bg-[#0B394B] text-white">
      {/* <span>
        <img src={logo} alt="Logo" className="w-10 h-10" />
      </span> */}
      <span className="text-[#67E8F9] text-2xl font-bold">AERTHYS</span>

      <ul className="flex gap-5 ">
        <li>
          <NavLink to="/">
            {({ isActive }) => (
              <span className={isActive ? 'text-[#67E8F9]' : ''}>Home</span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/blog">
            {({ isActive }) => (
              <span className={isActive ? 'text-[#67E8F9]' : ''}>Blog</span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/add-new">
            {({ isActive }) => (
              <span className={isActive ? 'text-[#67E8F9]' : ''}>Add New</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
