import React from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllBrokerages } from '../selectors';
import { initialLoad } from '../actions';
import { postData } from '../api';
import { Brokerage } from '../types/brokerage';

type Props = {
  setLoading: any;
};

const PlaidConnection = ({ setLoading }: Props) => {
  const brokerages = useSelector(selectAllBrokerages);
  const dispatch = useDispatch();

  const handleOnSuccess = (token: string) => {
    // send token to client server
    postData('/api/v1/brokerages/authComplete/', { token: token }).then(
      (response) => {
        if (response.status === 200) {
          dispatch(initialLoad());
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      },
    );
  };

  const config = {
    clientName: 'Passiv',
    env: 'development',
    product: ['investments'],
    publicKey: 'db7797dd137d1d2d7b519e5fdc998e',
    onExit: () => setLoading(false),
    onSuccess: handleOnSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  const handleOnClick = (brokerage: Brokerage) => {
    setTimeout(() => {
      setLoading(true);
    }, 500);
    postData(`/api/v1/brokerages/${brokerage.id}/authorize/`, {
      type: 'read',
    });
  };

  if (!brokerages) {
    return null;
  }

  const plaid = brokerages.filter(function (brokerage) {
    return brokerage.name === 'Plaid';
  })[0];

  return (
    <div>
      <button
        onClick={() => {
          handleOnClick(plaid);
          open();
        }}
        disabled={!ready}
      >
        Connect Other ...
      </button>
    </div>
  );
};

export default PlaidConnection;
