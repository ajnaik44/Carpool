import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideMenu from './Side Menu/SideMenu';
import Dashboard from './Dashboard';
import LandingPage from './Landing Page/LandingPage';
import ConfirmationPage from './Riders/ConfirmationPage';
import PassengerConfirmationPage from './Passengers/PassengerConfirmationPage';
import './style.css';

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <div className="app-container">
      <Router>
        {userAuthenticated && <SideMenu setUserAuthenticated={setUserAuthenticated} />}
        <Routes>
          <Route
            path="/"
            element={
              userAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <LandingPage
                  setUserAuthenticated={setUserAuthenticated}
                  userAuthenticated={userAuthenticated}
                />
              )
            }
          />
          <Route
            path="/dashboard/*"
            element={
              userAuthenticated ? (
                <Dashboard userAuthenticated={userAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/dashboard/ConfirmationPage" element={<ConfirmationPage />} />
          <Route path="/dashboard/PassengerConfirmationPage" element={<PassengerConfirmationPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
