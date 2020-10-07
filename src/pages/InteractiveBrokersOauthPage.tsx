import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { postData } from '../api';
import { reloadEverything } from '../actions';
import ShadowBox from '../styled/ShadowBox';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import { Step } from '../styled/SignupSteps';
import { selectQueryTokens } from '../selectors/router';
import { push } from 'connected-react-router';
import { Error } from '../types/groupInfo';

const InteractiveBrokersOauthPage = () => {
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
          dispatch(reloadEverything());
          setTimeout(() => {
            setLoading(false);
            setSuccess(true);
          }, 1000);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data);
        });
    }
  }, [dispatch, queryParams]);

  // if we're done, redirect the user to the dashboard
  if (success) {
    return <Redirect to="/app/setup-groups" />;
  }

  let overrideError = false;

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
      case '1046':
        errorDisplay = (
          <P>
            Passiv is not presently available to Canadian accounts at
            Interactive Brokers. We apologize for the inconvenience, but this is
            a business decision by Interactive Brokers Canada and not something
            we can resolve without their approval.
          </P>
        );
        break;
      case '1049':
        overrideError = true;
        errorDisplay = (
          <React.Fragment>
            <P>
              We have successfully connected your Interactive Brokers account,
              but there is a 24-hour delay before your account information will
              be available. You will receive an email letting you know when your
              account data has been successfully synced.
            </P>
            <P>
              If you don't receive an email within 2 days, please try again or{' '}
              <Link to="/app/help">contact support</Link>.
            </P>
          </React.Fragment>
        );
        break;
      case '1053':
        errorDisplay = (
          <React.Fragment>
            <P>
              Interactive Brokers Canada is not supported by Passiv due to our
              exclusivity agreement with Questrade. Please consider transferring
              this account to Questrade in order to use it with Passiv.
            </P>
            <P>
              If you believe you have received this message in error, please{' '}
              <Link to="/app/help">contact support</Link> and describe your
              situation.
            </P>
          </React.Fragment>
        );
        break;
      case '0000':
        errorDisplay = (
          <P>
            No access code was provided by Interactive Brokers. Did you approve
            the connection request?
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

  let result = null;
  if (loading === true) {
    result = (
      <React.Fragment>
        <Step>
          Establishing connection to Interactive Brokers...{' '}
          <FontAwesomeIcon icon={faSpinner} spin />
        </Step>
      </React.Fragment>
    );
  } else {
    result = (
      <React.Fragment>
        {overrideError ? (
          <Step>Connection successful</Step>
        ) : (
          <Step>Failed to establish connection :(</Step>
        )}

        <ShadowBox>
          {errorDisplay}
          <Button onClick={() => dispatch(push('/app/settings'))}>
            Settings
          </Button>
        </ShadowBox>
      </React.Fragment>
    );
  }

  return (
    <ShadowBox background="#04a287">
      <H1 color="white">SETUP</H1>
      {result}
    </ShadowBox>
  );
};

export default InteractiveBrokersOauthPage;
