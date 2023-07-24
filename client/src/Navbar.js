// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Replace with the correct path to your CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
