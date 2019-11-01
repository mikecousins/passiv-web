import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { postData } from '../api';
import { initialLoad } from '../actions';
import ShadowBox from '../styled/ShadowBox';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import { Step } from '../styled/SignupSteps';
import { selectQueryTokens } from '../selectors/router';
import { push } from 'connected-react-router';
import { Error } from '../types/groupInfo';

const QuestradeOauthPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState(false);

  const queryParams = useSelector(selectQueryTokens);
  const dispatch = useDispatch();

  useEffect(() => {
    const oauth_token = queryParams.oauth_token;
    const oauth_verifier = queryParams.oauth_verifier;

    if (oauth_token === null) {
      setLoading(false);
      setError({ code: '0000' });
    } else {
      setLoading(true);
      postData('/api/v1/brokerages/authComplete/', {
        oauth_token: oauth_token,
        oauth_verifier: oauth_verifier,
      })
        .then(() => {
          dispatch(initialLoad());
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
  }, [dispatch, queryParams]);

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
          <React.Fragment>
            <P>
              We encountered an unexpected error while attempting to establish a
              connection. Please try again later or{' '}
              <Link to="/app/help">contact support</Link> if this persists.
            </P>
            <P>
              Note that in order for a connection to be established, you must
              make sure that your brokerage account is fully opened and funded.
              If your brokerage account is new or the initial funding has not
              been finalized by the brokerage, then you may not be able to link
              your account to Passiv until it is fully opened.
            </P>
          </React.Fragment>
        );
        break;
    }
  }

  return (
    <ShadowBox background="#2a2d34">
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
            <Button onClick={() => dispatch(push('/app/settings'))}>
              Settings
            </Button>
          </ShadowBox>
        </React.Fragment>
      )}
    </ShadowBox>
  );
};

export default QuestradeOauthPage;
