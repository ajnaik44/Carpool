import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideMenu from './Side Menu/SideMenu';
import Dashboard from './Dashboard';
import LandingPage from './Landing Page/LandingPage'; // Import the LandingPage component
import './style.css';

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <div className="app-container">
      <Router>
        {!userAuthenticated ? (
          <LandingPage setUserAuthenticated={setUserAuthenticated} />
        ) : (
          <>
            <SideMenu />
            <Routes>
              <Route
                path="/dashboard/*"
                element={<Dashboard userAuthenticated={userAuthenticated} />}
              />
            </Routes>
          </>
        )}
        
      </Router>
    </div>
  );
};

export default App;
