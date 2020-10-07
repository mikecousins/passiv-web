import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { push, replace } from 'connected-react-router';
import { postData } from '../api';
import { reloadEverything } from '../actions';
import ShadowBox from '../styled/ShadowBox';
import { H1, H2, P, BulletUL, A } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import { Step } from '../styled/SignupSteps';
import { selectQueryTokens } from '../selectors/router';
import { selectQuestradeOfferFeature } from '../selectors/features';
import { selectIsPaid } from '../selectors/subscription';
import { Error } from '../types/groupInfo';
import styled from '@emotion/styled';

const BulletULPadded = styled(BulletUL)`
  padding-left: 20px;
  padding-top: 30px;
  padding-bottom: 10px;
`;

const H2Padded = styled(H2)`
  padding-bottom: 20px;
`;

const QuestradeOauthPage = () => {
  const [loading, setLoading] = useState(true);
  const [showUpgradeOffer, setShowUpgradeOffer] = useState(false);
  const [error, setError] = useState<Error>();
  const queryParams = useSelector(selectQueryTokens);
  const isPaid = useSelector(selectIsPaid);
  const questradeOfferFeatureActive = useSelector(selectQuestradeOfferFeature);
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
          if (isPaid || !questradeOfferFeatureActive) {
            setTimeout(() => {
              dispatch(replace('/app/setup-groups'));
            }, 1000);
          } else {
            setLoading(false);
            setShowUpgradeOffer(true);
          }
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
    <ShadowBox background="#04a287">
      <H1 color="white">SETUP</H1>
      {loading ? (
        <React.Fragment>
          <Step>
            Establishing connection to Questrade...{' '}
            <FontAwesomeIcon icon={faSpinner} spin />
          </Step>
        </React.Fragment>
      ) : showUpgradeOffer ? (
        <React.Fragment>
          <Step>Questrade connection established.</Step>
          <ShadowBox>
            <H2Padded>
              Congratulations, you're eligible for a <strong>free</strong>{' '}
              upgrade to Passiv Elite!
            </H2Padded>
            <P>
              <A
                href="https://www.questrade.com/self-directed-investing/tools/partners/passiv"
                target="_blank"
                rel="noopener noreferrer"
              >
                Questrade
              </A>{' '}
              has offered to pay for your subscription for one year, with no
              commitment on your part. No credit card is required and you can
              cancel at any time.
            </P>
            <P>
              You’ll get access to all basic features plus:
              <BulletULPadded>
                <li>
                  <A
                    href="https://passiv.com/help/tutorials/how-to-use-one-click-trades/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    One-click trades
                  </A>{' '}
                  - place orders easily through Passiv
                </li>
                <li>
                  <A
                    href="https://passiv.com/help/tutorials/how-to-set-up-multi-account-portfolios"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Multi-account portfolios
                  </A>{' '}
                  - combine accounts into a single target portfolio
                </li>
                <li>
                  <A
                    href="https://passiv.com/help/tutorials/how-to-manage-your-brokerage-connections"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Multiple brokerage connections
                  </A>{' '}
                  - connect more accounts and manage them together
                </li>
                <li>
                  <A
                    href="https://passiv.com/help/tutorials/how-to-manage-your-drift-notifications"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Portfolio drift notifications
                  </A>{' '}
                  - know when your portfolio drifts off target
                </li>
              </BulletULPadded>
            </P>
            <P>To claim your free year, just click the button below!</P>
            <Button onClick={() => dispatch(push('/app/questrade-offer'))}>
              Upgrade Now
            </Button>
            <Button onClick={() => dispatch(push('/app/setup-groups'))}>
              Setup Groups
            </Button>
          </ShadowBox>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Step>Failed to establish connection :(</Step>
          <ShadowBox>
            {errorDisplay}
            <Button onClick={() => dispatch(push('/app/settings'))}>
              Go to Settings
            </Button>
          </ShadowBox>
        </React.Fragment>
      )}
    </ShadowBox>
  );
};

export default QuestradeOauthPage;
