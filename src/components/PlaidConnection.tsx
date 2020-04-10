import React from 'react';
import PlaidLink from 'react-plaid-link';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllBrokerages } from '../selectors';
import { reloadEverything } from '../actions';
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
      response => {
        if (response.status === 200) {
          dispatch(reloadEverything());
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      },
    );
  };

  const handleOnClick = (brokerage: Brokerage) => {
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

  if (!brokerages) {
    return null;
  }

  const plaid = brokerages.filter(function(brokerage) {
    return brokerage.name === 'Plaid';
  })[0];

  return (
    <div onClick={() => handleOnClick(plaid)}>
      <PlaidLink
        clientName="Passiv"
        env="development"
        // @ts-ignore
        product={['investments']}
        publicKey="db7797dd137d1d2d7b519e5fdc998e"
        onExit={handleOnExit}
        onSuccess={handleOnSuccess}
      >
        Connect Other ...
      </PlaidLink>
    </div>
  );
};

export default PlaidConnection;
