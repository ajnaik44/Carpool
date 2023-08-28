import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Riders.css';
import axios from 'axios';

const Riders = () => {
  const navigate = useNavigate();
  const [startAddress, setStartAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationPrice, setDestinationPrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');

  const fetchRiders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/riders');
      setSearchResults(response.data); // Assuming response.data is an array of riders
    } catch (error) {
      console.error('Error fetching riders:', error);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  const handlePost = async () => {
    try {
      const response = await axios.post('http://localhost:5000/riders', {
        start: startAddress,
        destination: destinationAddress,
        price: destinationPrice,
      });
      if (response.data.message === 'Rider Added') {
        setError('');
        console.log('Rider Added');
        // Handle navigation or other actions here
        // For example, navigate('/dashboard');
        fetchRiders();
      } else {
        setError('Rider Not Added');
      }
    } catch (error) {
      setError('Rider Not Added');
    }
  };

  const handleSelectAddress = address => {
    setSelectedItem(address);
  };

  return (
    <div className="riders-container">
      <h2>Where are you going?</h2>

      <div className="form-grid">
        <label htmlFor="start">Start:</label>
        <input
          type="text"
          id="start"
          value={startAddress}
          onChange={e => setStartAddress(e.target.value)}
        />

        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          value={destinationAddress}
          onChange={e => setDestinationAddress(e.target.value)}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={destinationPrice}
          onChange={e => setDestinationPrice(e.target.value)}
        />
      </div>

      <button className="post-button" onClick={handlePost}>
        Post
      </button>

      {error && <p>{error}</p>}

      <div className="table-container">
        {searchResults.map((fare, index) => (
          <div
            className={`item ${selectedItem === fare.address ? 'selected' : ''}`}
            key={index}
          >
            <div>{fare.start}</div>
            <div>{fare.destination}</div>
            <div>{fare.price}</div>
            <div>
              <button onClick={() => handleSelectAddress(fare.address)}>Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Riders;
