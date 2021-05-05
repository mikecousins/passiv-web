import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { push, replace } from 'connected-react-router';
import { postData } from '../api';
import { reloadEverything } from '../actions';
import ShadowBox from '../styled/ShadowBox';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import { Step } from '../styled/SignupSteps';
import { selectQueryTokens } from '../selectors/router';
import { Error } from '../types/groupInfo';
import PreLoadLink from '../components/PreLoadLink';
import { HELP_PATH } from '../apps/Paths';

const AlpacaOauthPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const queryParams = useSelector(selectQueryTokens);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = queryParams.code;

    if (token === null) {
      setLoading(false);
      setError({ code: '0000' });
    } else {
      postData('/api/v1/brokerages/authComplete/', { token: token })
        .then(() => {
          dispatch(reloadEverything());
          setTimeout(() => {
            dispatch(replace('/setup-groups'));
          }, 1000);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            No access code was provided by Alpaca. Did you approve the
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
              <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if
              this persists.
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
    <ShadowBox background="#04a287">
      <H1 color="white">SETUP</H1>
      {loading ? (
        <React.Fragment>
          <Step>
            Establishing connection to Alpaca...{' '}
            <FontAwesomeIcon icon={faSpinner} spin />
          </Step>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Step>Failed to establish connection :(</Step>
          <ShadowBox>
            {errorDisplay}
            <Button onClick={() => dispatch(push('/settings'))}>
              Go to Settings
            </Button>
          </ShadowBox>
        </React.Fragment>
      )}
    </ShadowBox>
  );
};

export default AlpacaOauthPage;
