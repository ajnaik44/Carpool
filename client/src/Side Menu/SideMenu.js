import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidemenu.css';

const SideMenu = ({ setUserAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUserAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="side-menu">
      <ul className="menu-links">
        <li>
          <Link to="/dashboard/riders" className={location.pathname === '/dashboard/riders' || location.pathname === '/dashboard' ? 'active-link' : ''}>
            Riders
          </Link>
        </li>
        <li>
          <Link to="/dashboard/passengers" className={location.pathname === '/dashboard/passengers' ? 'active-link' : ''}>
            Passengers
          </Link>
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
