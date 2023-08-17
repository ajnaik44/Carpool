import React from 'react';
import { Link } from 'react-router-dom';
import './sidemenu.css';

const SideMenu = () => {
  return (
    <div className="side-menu">
      <ul className="menu-links">
        <li>
          <Link to="/dashboard/riders">Riders</Link>
        </li>
        <li>
          <Link to="/dashboard/passengers">Passengers</Link>
        </li>
      </ul>
      <div className="logout-button">
        <Link to="/logout">Logout</Link> {/* Add a link to the logout page */}
      </div>
    </div>
  );
};

export default SideMenu;
