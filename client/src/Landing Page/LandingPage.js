import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';

const LandingPage = ({ setUserAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Email:', email);
    console.log('Password:', password); // Add thi

    try {
      if (email === 'admin@admin.com' && password === 'admin') {
        setError('');
        setUserAuthenticated(true);
        navigate('/dashboard');
      } else {
        const response = await axios.post('http://localhost:5000/api/login', {
          email,
          password,
        });

        if (response.data.success) {
          setError('');
          setUserAuthenticated(true);
          navigate('/dashboard');
        } else {
          setError('Invalid credentials');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };  

  return (
    <div className="landing-page">
      <h1>Welcome to KarPool</h1>
      <div className="form-container">
        <form onSubmit={handleFormSubmit} className="landing-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="landing-button">
            {isRegisterMode ? 'Register' : 'Login'}
          </button>
        </form>
        <p>
          {isRegisterMode
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <Link
            to="#"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
          >
            {isRegisterMode ? 'Login' : 'Register'}
          </Link>
        </p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LandingPage;
