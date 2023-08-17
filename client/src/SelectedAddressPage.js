import React from 'react';
import { useParams } from 'react-router-dom';

const SelectedAddressPage = () => {
  const { address } = useParams();

  return (
    <div>
      <h2>Selected Address</h2>
      <p>{address}</p>
    </div>
  );
};

export default SelectedAddressPage;
