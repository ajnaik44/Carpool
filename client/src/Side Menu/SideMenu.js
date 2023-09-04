import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidemenu.css';

const SideMenu = ({ setUserAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserAuthenticated(false);
    navigate('/');
  };

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
        <Link to="#" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
