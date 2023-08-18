import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom'; // Import Outlet
import SideMenu from './Side Menu/SideMenu';
import Riders from './Riders/Riders';
import Passengers from './Passengers/Passengers';

const Dashboard = () => {
  return (
    <div>
      <SideMenu />
      <Routes>
        <Route
          path="/"
          element={<Outlet />}>
          <Route index element={<Riders />} />
          <Route path="/riders" element={<Riders />} />
          <Route path="/passengers" element={<Passengers />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Dashboard;
