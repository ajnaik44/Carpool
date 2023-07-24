import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link> {/* Add the link to the registration page */}
        </li>
        {/* Add more navigation links if needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
