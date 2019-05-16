import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import qs from 'qs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { postData } from '../api';
import { initialLoad } from '../actions';
import ShadowBox from '../styled/ShadowBox';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import { Step } from '../styled/SignupSteps';
import { selectRouter } from '../selectors/router';
import { push } from 'connected-react-router';

const QuestradeOauthPage = ({ router, reloadAllState, push }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const queryParams = qs.parse(router.location.search, {
      ignoreQueryPrefix: true,
    });
    const token = queryParams.code;

    if (token === null) {
      setLoading(false);
      setError({ code: '0000' });
    } else {
      setLoading(true);
      postData('/api/v1/brokerages/authComplete/', { token: token })
        .then(() => {
          reloadAllState();
          setTimeout(() => {
            setLoading(false);
            setSuccess(true);
          }, 1000);
        })
        .catch(error => {
          setLoading(false);
          setError(error.response.data);
        });
    }
  }, [reloadAllState, router.location.search]);

  // if we're done, redirect the user to the dashboard
  if (success) {
    return <Redirect to="/app/dashboard" />;
  }

  let errorDisplay = null;
  if (error) {
    switch (error.code) {
      case '1006':
        errorDisplay = (
          <P>This connection code is invalid, please try again.</P>
        );
        break;
      case '1007':
        errorDisplay = (
          <P>This connection code has expired, please try again.</P>
        );
        break;
      case '1017':
        errorDisplay = (
          <P>
            An identical connection already exists, please update or delete the
            existing connection.
          </P>
        );
        break;
      case '1023':
        errorDisplay = (
          <P>
            The brokerage account linked to this connection is different from
            the account you're trying to link. This is not allowed because it
            would leave existing portfolios without a functional connection.
            Instead, create a new connection and delete this one if desired.
          </P>
        );
        break;
      case '0000':
        errorDisplay = (
          <P>
            No access code was provided by Questrade. Did you approve the
            connection request?
          </P>
        );
        break;
      default:
        errorDisplay = (
          <P>
            We encountered an unexpected error while attempting to establish a
            connection. Please try again later or{' '}
            <Link to="/app/help">contact support</Link> if this persists.
          </P>
        );
        break;
    }
  }

  return (
    <ShadowBox dark>
      <H1 color="white">SETUP</H1>
      {loading ? (
        <React.Fragment>
          <Step>
            Establishing connection to Questrade...{' '}
            <FontAwesomeIcon icon={faSpinner} spin />
          </Step>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Step>Failed to establish connection :(</Step>
          <ShadowBox>
            {errorDisplay}
            <Button onClick={() => push('/app/settings')}>Settings</Button>
          </ShadowBox>
        </React.Fragment>
      )}
    </ShadowBox>
  );
};

const select = state => ({
  router: selectRouter(state),
});

const actions = {
  reloadAllState: initialLoad,
  push: push,
};

export default connect(
  select,
  actions,
)(QuestradeOauthPage);
