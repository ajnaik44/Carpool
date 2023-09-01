import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Passengers.css';

const Passengers = () => {
  const [startAddress, setStartAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const fetchPassengers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/passengers');
      setSearchResults(response.data); // Assuming response.data is an array of passengers
    } catch (error) {
      console.error('Error fetching passengers:', error);
    }
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/passengers', {
        start: startAddress,
        destination: destinationAddress
      });
      if (response.data.message === 'Passenger Added') {
        setError('');
        console.log('Passenger Added');
        setSuccessMessage('Passenger Added Successfully');
        // Handle navigation or other actions here
        // For example, navigate('/dashboard');
        fetchPassengers();
      } else {
        setError('Passenger Not Added');
      }
    } catch (error) {
      setError('Passenger Not Added');
    }
  };

  const handleSelectAddress = address => {
    setSelectedItem(address);
  };

  return (
    <div className="passengers-container">
      <h2>Where do you wanna go?</h2>
      <div className="form-grid">
        <div>
          <label htmlFor="start">Start:</label>
          <input
            type="text"
            id="start"
            value={startAddress}
            onChange={e => setStartAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destinationAddress}
            onChange={e => setDestinationAddress(e.target.value)}
          />
        </div>
      </div>
      <button
        className="search-button"
        onClick={handleSearch}
      >
        Search
      </button>
      <div className="table-container">
        {searchResults.map((passenger, index) => (
          <div
            className={`item ${selectedItem === passenger.address ? 'selected' : ''}`}
            key={index}
          >
            <div>{passenger.start}</div>
            <div>{passenger.destination}</div>
           
            <div>
              <button onClick={() => handleSelectAddress(passenger.start)}>Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Passengers;
