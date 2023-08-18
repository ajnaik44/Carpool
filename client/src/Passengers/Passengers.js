import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Passengers.css';

const Passengers = () => {
  const navigate = useNavigate();
  const [startAddress, setStartAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fakeFares = [
    { name: 'Rider 1', address: '123 Main St', price: '$10' },
    { name: 'Rider 2', address: '456 Elm St', price: '$15' },
    { name: 'Rider 3', address: '789 Oak Ave', price: '$12' },
    { name: 'Rider 4', address: '555 Pine Rd', price: '$8' },
  ];

  //TODO: CALL MONGO HERE
  const handleSearch = () => {
    const results = fakeFares.filter(fare =>
      fare.address.toLowerCase().includes(startAddress.toLowerCase())
    );
    setSearchResults(results);
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
        {searchResults.map((fare, index) => (
          <div
            className={`item ${selectedItem === fare.address ? 'selected' : ''}`}
            key={index}
          >
            <div>{fare.name}</div>
            <div>{fare.address}</div>
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

export default Passengers;
