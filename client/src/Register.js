import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setUserAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (username === 'admin' && password === 'admin') {
        // Successful registration with admin credentials
        setError('');
        setUserAuthenticated(true);
        navigate('/dashboard');
      } else {
        const response = await axios.post('http://localhost:5000/api/register', {
          username,
          password,
        });

        if (response.data.success) {
          setError('');
          setUserAuthenticated(true);
          navigate('/dashboard');
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
