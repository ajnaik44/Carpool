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

  const handlePost = () => {
    // Implement your post logic here
    // For example, you can send data to an API or perform any other post operation
    // Update the state or perform any other necessary actions
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
        {/* Render your search results here */}
        {/* You can map over the searchResults and display them */}
        {/* Example: */}
        {/* {searchResults.map((item, index) => (
          <div
            className={`item ${selectedItem === item.address ? 'selected' : ''}`}
            key={index}
          >
            <div>{item.name}</div>
            <div>{item.address}</div>
            <div>{item.price}</div>
            <div>
              <button onClick={() => handleSelectAddress(item.address)}>Select</button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Riders;
