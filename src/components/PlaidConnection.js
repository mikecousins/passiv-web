import React from 'react';
import PlaidLink from 'react-plaid-link';
import { connect } from 'react-redux';

import { selectAllBrokerages } from '../selectors';
import { initialLoad } from '../actions';
import { postData } from '../api';

const PlaidConnection = ({ brokerages, reloadAllState, setLoading }) => {
  const handleOnSuccess = (token, metadata) => {
    // send token to client server
    postData('/api/v1/brokerages/authComplete/', { token: token }).then(
      response => {
        if (response.status === 200) {
          reloadAllState();
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      },
    );
  };

  const handleOnClick = brokerage => {
    setTimeout(() => {
      setLoading(true);
    }, 500);
    postData(`/api/v1/brokerages/${brokerage.id}/authorize/`, {
      type: 'read',
    });
  };

  const handleOnExit = () => {
    setLoading(false);
    // handle the case when your user exits Link
  };

  const plaid = brokerages.filter(function(brokerage) {
    return brokerage.name === 'Plaid';
  })[0];

  return (
    <div onClick={() => handleOnClick(plaid)}>
      <PlaidLink
        clientName="Passiv"
        env="development"
        product={['investments']}
        publicKey="db7797dd137d1d2d7b519e5fdc998e"
        onExit={handleOnExit.bind()}
        onSuccess={handleOnSuccess.bind()}
      >
        Connect Other ...
      </PlaidLink>
    </div>
  );
};

const select = state => ({
  brokerages: selectAllBrokerages(state),
});
const actions = {
  reloadAllState: initialLoad,
};

export default connect(
  select,
  actions,
)(PlaidConnection);
