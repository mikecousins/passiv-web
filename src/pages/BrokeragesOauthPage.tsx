import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { push, replace } from 'connected-react-router';
import { postData } from '../api';
import { reloadEverything } from '../actions';
import ShadowBox from '../styled/ShadowBox';
import { A, H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import { selectQueryTokens } from '../selectors/router';
import { Error } from '../types/groupInfo';
import PreLoadLink from '../components/PreLoadLink';
import { CONTACT_FORM_PATH } from '../apps/Paths';
import { selectBrokerages, selectMaintenanceBrokerages } from '../selectors';
import { selectIsPaid } from '../selectors/subscription';
import { Brokerage as BrokerageType } from '../types/brokerage';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';

const ActionContainer = styled.div`
  margin-top: 44px;
  @media (max-width: 900px) {
    button {
      margin: 10px auto;
    }
  }
`;

export const Continue = styled(Button)`
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.25px;
  svg {
    margin-left: 10px;
  }
`;

const Container = styled(ShadowBox)`
  background-color: var(--brand-light-green);
  padding: 50px;
  * {
    text-align: center;
  }
`;

const ExclamationIcon = styled.div`
  font-size: 75px;
`;

type Props = {
  brokerageName: string;
};

const BrokeragesOauthPage = ({ brokerageName }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const queryParams = useSelector(selectQueryTokens);
  const isPaid = useSelector(selectIsPaid);
  const dispatch = useDispatch();
  const brokerages = useSelector(selectBrokerages);
  const maintenanceBrokerages = useSelector(selectMaintenanceBrokerages);

  if (brokerageName === 'Zerodha') {
    postData('/api/v1/tradesinprogress/', queryParams).then((response) => {
      if (response.data.portfolio_group) {
        dispatch(replace(`/group/${response.data.portfolio_group}`));
        dispatch(reloadEverything());
      }
    });
  }

  useEffect(() => {
    let token: any = { token: queryParams.code };
    if (brokerageName === 'Interactive Brokers') {
      token = {
        oauth_token: queryParams.oauth_token,
        oauth_verifier: queryParams.oauth_verifier,
      };
    }
    if (brokerageName === 'Zerodha') {
      token = { token: queryParams.request_token };
    }
    if (token === null) {
      setLoading(false);
      setError({ code: '0000' });
    } else {
      postData('/api/v1/brokerages/authComplete/', token)
        .then(() => {
          dispatch(reloadEverything());
          if (brokerageName === 'Questrade' && !isPaid) {
            setTimeout(() => {
              dispatch(
                replace(
                  `/connected-brokerage?brokerage=${brokerageName}&status=2`,
                ),
              );
            }, 1000);
          } else {
            setTimeout(() => {
              dispatch(
                replace(
                  `/connected-brokerage?brokerage=${brokerageName}&status=1`,
                ),
              );
            }, 1000);
          }
        })
        .catch((error) => {
          // if ibkr error, skip it
          if (error.response.data.code === 1049) {
            setTimeout(() => {
              dispatch(
                replace(
                  `/connected-brokerage?brokerage=${brokerageName}&status=1`,
                ),
              );
            }, 1000);
          }
          setTimeout(() => {
            setLoading(false);
            setError(error.response.data);
          }, 3000);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkBrokerageMaintenance = (brokerage: BrokerageType) => {
    if (
      maintenanceBrokerages.find((b: BrokerageType) => b.id === brokerage.id)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const startConnection = () => {
    const brokerage =
      brokerages &&
      brokerages.find((brokerage) => brokerage.name === 'Questrade');
    if (brokerage) {
      if (checkBrokerageMaintenance(brokerage) === true) {
        toast.error(
          `${brokerage.name} is currently undergoing maintenance and cannot establish new connections at this time. Please try again later.`,
        );
      } else {
        postData(`/api/v1/brokerages/${brokerage.id}/authorize/`, {
          type: 'read',
        }).then((response) => {
          window.location = response.data.url;
        });
      }
    }
  };

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
        if (brokerageName === 'Questrade') {
          errorDisplay = (
            <React.Fragment>
              <P>
                The brokerage account you tried to link is already connected
                with Passiv.
              </P>
              <P>
                If you are trying to add a new connection for another account,
                please make sure that you are logged out of Questrade's
                dashboard.{' '}
                <A
                  href="https://my.questrade.com/clients/signout.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Logout Questrade
                </A>
              </P>
              <P>
                If you are trying to change your connection type (for example,
                switching from read-access to trade-access), check out our
                tutorial on{' '}
                <A
                  href="https://passiv.com/help/tutorials/how-to-manage-your-brokerage-connections/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Managing your Brokerage Connections
                </A>
                .
              </P>
              <Button onClick={() => startConnection()}>Try Again</Button>
            </React.Fragment>
          );
        } else {
          errorDisplay = (
            <P>
              An identical connection already exists, please update or delete
              the existing connection.
            </P>
          );
        }
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
              <PreLoadLink path={CONTACT_FORM_PATH}>
                contact support
              </PreLoadLink>{' '}
              and describe your situation.
            </P>
          </React.Fragment>
        );
        break;
      case '0000':
        errorDisplay = (
          <P>
            No access code was provided by {brokerageName}. Did you approve the
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
              <PreLoadLink path={CONTACT_FORM_PATH}>
                contact support
              </PreLoadLink>{' '}
              if this persists.
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

  if (loading) {
    result = (
      <H1>
        Establishing connection to {brokerageName}...{' '}
        <FontAwesomeIcon icon={faSpinner} spin />
      </H1>
    );
  } else if (error) {
    result = (
      <React.Fragment>
        <ExclamationIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} color="orange" />
        </ExclamationIcon>
        <H1>Failed to establish a connection</H1>
        {errorDisplay}
        <ActionContainer>
          <Continue onClick={() => dispatch(push('/settings'))}>
            Go to Settings
          </Continue>
        </ActionContainer>
      </React.Fragment>
    );
  }

  return <Container>{result}</Container>;
};

export default BrokeragesOauthPage;
