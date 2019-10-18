import React from 'react';
import PlaidConnection from '../components/PlaidConnection';
import { H1 } from '../styled/GlobalElements';

const PlaidConnectPage = () => {
  return (
    <React.Fragment>
      <H1>Connect your brokerage account</H1>
      <div>
        <PlaidConnection />
      </div>
    </React.Fragment>
  );
};

export default PlaidConnectPage;
