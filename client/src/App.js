import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import './style.css';

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <div className="app-container">
      <Router>
        {!userAuthenticated ? (
          <Navbar />
        ) : (
          <>
            <SideMenu />
            <Routes>
              <Route
                path="/dashboard/*"
                element={<Dashboard />}
              />
            </Routes>
          </>
        )}
        <Routes>
          <Route
            path="/login"
            element={<Login setUserAuthenticated={setUserAuthenticated} />}
          />
          <Route
            path="/register"
            element={<Register setUserAuthenticated={setUserAuthenticated} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
