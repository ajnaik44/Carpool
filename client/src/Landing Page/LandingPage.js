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
    console.log('Password:', password);
    if (isRegisterMode == true) {
      try {
        // Registration flow
        const response = await axios.post('http://localhost:5000/register', {
          username: email,
          password: password,
        });
        if (response.data.message === 'Success') {
          setError('');
          console.log('Registration successful');
          // Handle navigation or other actions here
          setError('');
          setUserAuthenticated(true);
          isRegisterMode = false;
        }

        else {
          setError('Authentication failed');
          setUserAuthenticated(false);

        }

      } catch (error) {
        setError('Authentication failed');
      }
    }
    else {
      //login flow
      // try {

      // const response = await axios.post('http://localhost:5000/authenticate', {
      //     username: email,
      //     password: password,});
      // if (response.data.message !=null) {
      //     setError('');
      //     console.log('Authentication successful');
      //     // Handle navigation or other actions here
      // setError('');
      //     setUserAuthenticated(true);

      // navigate('/dashboard');
      //   } 

      // else {
      // 	setError('Authentication failed');
      //     setUserAuthenticated(false);

      //     }

      // } catch (error) {
      //   setError('Authentication failed');
      // }
      setUserAuthenticated(true);
      navigate('/dashboard');
    }
  };

  return (
    <div className="landing-page">
      <h1>Welcome to CarPool</h1>
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
