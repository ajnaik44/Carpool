import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom'; // Import Outlet
import SideMenu from './SideMenu';
import Riders from './Riders/Riders';
import PassengersPage from './Passengers';

const Dashboard = () => {
  return (
    <div>
      <SideMenu />
      <Routes>
        <Route
          path="/"
          element={<Outlet />}> {/* Use Outlet */}
          <Route index element={<Riders />} />
          <Route path="/riders" element={<Riders />} />
          <Route path="/passengers" element={<PassengersPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Dashboard;
