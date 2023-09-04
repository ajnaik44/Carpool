import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Riders.css'; // Import your CSS file
import axios from 'axios';

const Riders = () => {
  const [startAddress, setStartAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationPrice, setDestinationPrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPassengers, setSelectedPassengers] = useState([]);
  const [error, setError] = useState('');
  const [showTitle, setShowTitle] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  useEffect(() => {
    if (searchResults.length > 0) {
      setShowTitle(true);
    }
  }, [searchResults]);

  const fetchPassengers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/passengers');
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching passengers:', error);
    }
  };

  const handlePost = async () => {
    try {
      const response = await axios.post('http://localhost:5000/riders', {
        start: startAddress,
        destination: destinationAddress,
        price: destinationPrice,
        passengers: selectedPassengers,
      });
      if (response.data.message === 'Rider Added') {
        setError('');
        console.log('Rider Added');
        fetchPassengers();
        setSelectedPassengers([]);
        setShowConfirmButton(false);
      } else {
        setError('Rider Not Added');
      }
    } catch (error) {
      setError('Rider Not Added');
    }
  };

  const handleSelectPassenger = (selectedPassenger) => {
    let updatedSelectedPassengers;

    if (selectedPassengers.includes(selectedPassenger)) {
      updatedSelectedPassengers = selectedPassengers.filter((passenger) => passenger !== selectedPassenger);
    } else if (selectedPassengers.length < 4) {
      updatedSelectedPassengers = [...selectedPassengers, selectedPassenger];
    } else {
      updatedSelectedPassengers = selectedPassengers;
    }

    setSelectedPassengers(updatedSelectedPassengers);
    setShowConfirmButton(updatedSelectedPassengers.length > 0);
  };

  return (
    <div className="riders-container">
      <h2 className="page-title">Where are you going?</h2>

      <div className="form-grid">
        <label htmlFor="start" className="label">Your Address:</label>
        <input
          type="text"
          id="start"
          value={startAddress}
          onChange={(e) => setStartAddress(e.target.value)}
          className="input"
        />

        <label htmlFor="destination" className="label">Destination Address:</label>
        <input
          type="text"
          id="destination"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
          className="input"
        />

        <label htmlFor="price" className="label">Price:</label>
        <input
          type="text"
          id="price"
          value={destinationPrice}
          onChange={(e) => setDestinationPrice(e.target.value)}
          className="input"
        />
      </div>

      <button className="post-button" onClick={handlePost}>
        Post
      </button>

      {error && <p className="error-message">{error}</p>}

      {showTitle && <div className="table-title">Here's the Passengers you could pick up:</div>}

      <div className="table-container">
        {searchResults.map((passenger, index) => (
          <div
            className={`item ${selectedPassengers.includes(passenger) ? 'selected' : ''}`}
            key={index}
          >
            <div className="table-item">{passenger.start}</div>
            <div className="table-item">{passenger.destination}</div>
            <div className="table-item">
              <button
                onClick={() => handleSelectPassenger(passenger)}
                className={`select-button ${selectedPassengers.includes(passenger) ? 'selected' : ''}`}
              >
                {selectedPassengers.includes(passenger) ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showConfirmButton && (
        <Link
          to={`/dashboard/ConfirmationPage?startAddress=${startAddress}&destinationAddress=${destinationAddress}&destinationPrice=${destinationPrice}&selectedPassengers=${JSON.stringify(selectedPassengers)}`}
          className="confirm-button"
        >
          Confirm
        </Link>
      )}
    </div>
  );
};

export default Riders;
