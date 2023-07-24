import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import LoginForm from './LoginForm'; // Import the LoginForm component
import Register from './Register'; // Import the Register component

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Include the Navbar component here */}
      <Routes>
         <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} /> {/* Add the Register route */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
