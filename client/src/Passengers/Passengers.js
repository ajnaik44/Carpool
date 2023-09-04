import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Passengers.css';

const Passengers = () => {
  const [startAddress, setStartAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPassengers, setSelectedPassengers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/riders');
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching passengers:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/passengers', {
        start: startAddress,
        destination: destinationAddress,
      });
      if (response.data.message === 'Passenger Added') {
        setError('');
        console.log('Passenger Added');
        setSuccessMessage('Passenger Added Successfully');
        fetchDrivers();
      } else {
        setError('Passenger Not Added');
      }
    } catch (error) {
      setError('Passenger Not Added');
    }
  };

  const handleSelectAddress = (selectedPassenger) => {
    let updatedSelectedPassengers;

    if (selectedPassengers.includes(selectedPassenger)) {
      updatedSelectedPassengers = selectedPassengers.filter((passenger) => passenger !== selectedPassenger);
    } else if (selectedPassengers.length < 4) {
      updatedSelectedPassengers = [...selectedPassengers, selectedPassenger];
    } else {
      updatedSelectedPassengers = selectedPassengers;
    }

    setSelectedPassengers(updatedSelectedPassengers);
  };

  const handleConfirm = () => {
    const firstSelectedPassenger = selectedPassengers[0];
    console.log(firstSelectedPassenger.price)
    console.log(firstSelectedPassenger.start)
    console.log(firstSelectedPassenger.destination)
    const url = `/dashboard/PassengerConfirmationPage?startAddress=${startAddress}&destinationAddress=${destinationAddress}&price=${firstSelectedPassenger.price}`;
    navigate(url);
  };

  return (
    <div className="passengers-container">
      <h2>Where do you wanna go?</h2>
      <div className="form-grid">
        <div>
          <label htmlFor="start">Pick-up Address:</label>
          <input
            type="text"
            id="start"
            value={startAddress}
            onChange={(e) => setStartAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="destination">Drop-off Address:</label>
          <input
            type="text"
            id="destination"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
          />
        </div>
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      <div className="table-container">
        {searchResults.map((passenger, index) => (
          <div
            className={`item ${selectedPassengers.includes(passenger) ? 'selected' : ''}`}
            key={index}
          >
            <div>{passenger.start}</div>
            <div>{passenger.destination}</div>
            <div>{passenger.price}</div>
            <div>
              <button onClick={() => handleSelectAddress(passenger)}>
                {selectedPassengers.includes(passenger) ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedPassengers.length > 0 && (
        <button className="confirm-button" onClick={handleConfirm}>
          Confirm
        </button>
      )}
    </div>
  );
};

export default Passengers;
