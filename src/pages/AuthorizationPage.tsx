import React from 'react';
import { useSelector } from 'react-redux';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectIsAuthorized, selectBrokerages } from '../selectors';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { H1 } from '../styled/GlobalElements';
import { postData } from '../api';
import { Button } from '../styled/Button';
import PlaidConnectPage from './PlaidConnectPage';

const AuthorizationPage = () => {
  const authorized = useSelector(selectIsAuthorized);
  const brokerages = useSelector(selectBrokerages);
  const { brokerage } = useParams();

  if (authorized === undefined || !brokerages) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  if (!brokerage) {
    return (
      <React.Fragment>
        <H1>Choose your brokerage:</H1>
        <Link to="/app/connect/questrade">Questrade</Link>
        <Link to="/app/connect/alpaca">Alpaca</Link>
        <Link to="/app/connect/plaid">Other</Link>
      </React.Fragment>
    );
  } else if (brokerage === 'questrade') {
    return (
      <Button
        onClick={() => {
          const brokerage = brokerages.find(
            brokerage => brokerage.name === 'Questrade',
          );
          if (brokerage) {
            postData(`/api/v1/brokerages/${brokerage.id}/authorize/`, {
              type: 'read',
            }).then(response => {
              window.location = response.data.url;
            });
          }
        }}
      >
        Connect to Questrade
      </Button>
    );
  } else if (brokerage === 'alpaca') {
    return (
      <Button
        onClick={() => {
          const brokerage = brokerages.find(
            brokerage => brokerage.name === 'Alpaca',
          );
          if (brokerage) {
            postData(`/api/v1/brokerages/${brokerage.id}/authorize/`, {
              type: 'read',
            }).then(response => {
              window.location = response.data.url;
            });
          }
        }}
      >
        Connect to Questrade
      </Button>
    );
  } else if (brokerage === 'plaid') {
    return <PlaidConnectPage />;
  }

  return null;
};

export default AuthorizationPage;
