import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Riders.css';

const Riders = () => {
  const navigate = useNavigate();
  const [startAddress, setStartAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationPrice, setDestinationPrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fakePassengers = [
    { name: 'Rider 1', address: '123 Main St'},
    { name: 'Rider 2', address: '456 Elm St'},
    { name: 'Rider 3', address: '789 Oak Ave'},
    { name: 'Rider 4', address: '555 Pine Rd'},
  ];

  //TODO: CALL MONGO HERE
  const handlePost = () => {
    const results = fakePassengers.filter(passengers =>
      passengers.address.toLowerCase().includes(startAddress.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSelectAddress = address => {
    setSelectedItem(address);
  };

  return (
    <div className="riders-container">
      <h2>Where are you wanna going?</h2>

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

export default Riders;
