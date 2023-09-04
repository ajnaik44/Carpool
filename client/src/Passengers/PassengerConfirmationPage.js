import React from 'react';
import { useLocation } from 'react-router-dom';

const PassengerConfirmationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const startAddress = queryParams.get('startAddress');
  const destinationAddress = queryParams.get('destinationAddress');
  const price = queryParams.get('price');

  if (!startAddress || !destinationAddress || !price) {
    return <div className="error-message">Error: Data not found</div>;
  }

  return (
    <div className="confirmation-container">
      <h2>Confirmation Page</h2>
      
      <p>Pick-up Address: {startAddress}</p>
      <p>Drop-off Address: {destinationAddress}</p>

      <div className='passenger-details'> 
        <p>Price: {price}</p>
      </div>
      
      </div>
  );
};

export default PassengerConfirmationPage;
