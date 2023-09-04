import React from 'react';
import { useLocation } from 'react-router-dom';
import './ConfirmationPage.css'; 

const ConfirmationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const startAddress = queryParams.get('startAddress').replace(/"/g, '');
  const destinationAddress = queryParams.get('destinationAddress').replace(/"/g, '');;
  const destinationPrice = 4;
  const selectedPassengers = JSON.parse(queryParams.get('selectedPassengers'));
  console.log('aaaaaaaaaaaa '+ startAddress);
  console.log('aaaaaaaaaaaadd '+destinationAddress);
  console.log('aaaaaaaaaaaadccc '+destinationPrice);
  console.log('aaaaaaaaaaaawwwwwwww '+selectedPassengers);
  if (!startAddress || !destinationAddress || !destinationPrice || !selectedPassengers) {
    return <div>Error: Data not found</div>;
  }

  return (
    <div className="confirmation-container">
      <h2>Confirmation Page</h2>
      <p>Start Address: {startAddress}</p>
      <p>Destination Address: {destinationAddress}</p>
      <p>Price: {destinationPrice}</p>
      <h4>Your Passengers:</h4>
      {selectedPassengers.map((passenger, index) => (
        <div key={index}  className="passenger-details">
          <p>Pick-up Address: {passenger.start}</p>
          <p>Destination: {passenger.destination}</p>
        </div>
      ))}
    </div>
  );
};

export default ConfirmationPage;
