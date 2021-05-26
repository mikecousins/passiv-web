import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltRight,
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
import { selectQuestradeOfferFeature } from '../selectors/features';
import { Brokerage as BrokerageType } from '../types/brokerage';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { Description } from '../components/Onboarding /Intro';

const ActionContainer = styled.div`
  margin-top: 44px;
`;

export const Continue = styled(Button)`
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.25px;
  padding: 15px 19px 17px;
  svg {
    margin-left: 10px;
  }
`;

const ConnectMore = styled(Button)`
  background-color: transparent;
  color: var(--brand-blue);
  border: 2px solid var(--brand-blue);
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.25px;
`;

const Container = styled(ShadowBox)`
  background-color: var(--brand-light-green);
  padding: 200px;
  * {
    text-align: center;
  }
`;

type Props = {
  brokerageName: string;
};

const BrokeragesOauthPage = ({ brokerageName }: Props) => {
  const [loading, setLoading] = useState(true); //TODO set this to true by default
  const [showUpgradeOffer, setShowUpgradeOffer] = useState(false);
  const [error, setError] = useState<Error>();
  const [connectedSuccessfully, setConnectedSuccessfully] = useState(false);
  const queryParams = useSelector(selectQueryTokens);
  const isPaid = useSelector(selectIsPaid);
  const questradeOfferFeatureActive = useSelector(selectQuestradeOfferFeature);
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
          setLoading(false);
          dispatch(reloadEverything());
          setConnectedSuccessfully(true);
          if (
            brokerageName === 'Questrade' &&
            (!isPaid || questradeOfferFeatureActive)
          ) {
            setShowUpgradeOffer(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data);
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
  let overrideError = false; // only for IBKR

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
              If you don't receive an email within 2 days, please try again or
              <PreLoadLink path={CONTACT_FORM_PATH}>
                contact support
              </PreLoadLink>
              .
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
  }
  if (error && !overrideError) {
    result = (
      <React.Fragment>
        <H1>Failed to establish connection</H1>
        {errorDisplay}
        <ActionContainer>
          <Continue onClick={() => dispatch(push('/settings'))}>
            Go to Settings
          </Continue>
        </ActionContainer>
      </React.Fragment>
    );
  } else {
    if (connectedSuccessfully) {
      result = (
        <React.Fragment>
          <H1>Connection Complete</H1>
          <Description>
            {/* //TODO do a check to see if is part of onBoarding */}
            Thanks for connecting your {brokerageName} account! Connect another
            brokerage or move on to the next step!
          </Description>
          {showUpgradeOffer && (
            <div>
              <P>
                Congratulations!! You are eligible for a FREE upgrade to Passiv
                Elite with your Questrade account!
              </P>
              <P>
                <A
                  href="https://www.questrade.com/self-directed-investing/tools/partners/passiv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Questrade
                </A>{' '}
                offers Passiv Elite as a free tool for Questrade customers. It's
                available for free as long as you keep your Questrade account
                connected to Passiv.
              </P>
              <P>
                You’ll get access to all basic features plus the option to{' '}
                <A
                  href="https://passiv.com/help/tutorials/how-to-use-one-click-trades/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  place orders through Passiv
                </A>{' '}
                in just one click.
              </P>
              <Button onClick={() => dispatch(push('/questrade-offer'))}>
                Upgrade Now
              </Button>
            </div>
          )}
          <ActionContainer>
            <ConnectMore onClick={() => dispatch(push('/welcome?step=2'))}>
              Connect Another Account
            </ConnectMore>
            <Continue onClick={() => dispatch(push('/welcome?step=3'))}>
              Continue to Next Step
              <FontAwesomeIcon icon={faLongArrowAltRight} size="lg" />
            </Continue>
          </ActionContainer>
        </React.Fragment>
      );
    }
  }

  return <Container>{result}</Container>;
};

// if (loading === true) {
//   result = (
//     <React.Fragment>
//       <Step>
//         Establishing connection to {brokerageName}...{' '}
//         <FontAwesomeIcon icon={faSpinner} spin />
//       </Step>
//     </React.Fragment>
//   );
// } else {
//   if (brokerageName === 'Questrade' && showUpgradeOffer) {
//     result = (
//       <React.Fragment>
//         <Step>Questrade connection established.</Step>
//         <ShadowBox>
//           <H2Padded>
//             You're eligible for a <strong>free</strong> upgrade to Passiv
//             Elite!
//           </H2Padded>
//           <P>
//             <A
//               href="https://www.questrade.com/self-directed-investing/tools/partners/passiv"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Questrade
//             </A>{' '}
//             offers Passiv Elite as a free tool for Questrade customers. It's
//             available for free as long as you keep your Questrade account
//             connected to Passiv.
//           </P>
//           <P>
//             You’ll get access to all basic features plus the option to{' '}
//             <A
//               href="https://passiv.com/help/tutorials/how-to-use-one-click-trades/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               place orders through Passiv
//             </A>{' '}
//             in just one click.
//           </P>
//           <Button onClick={() => dispatch(push('/questrade-offer'))}>
//             Upgrade Now
//           </Button>
//         </ShadowBox>
//       </React.Fragment>
//     );
//   } else {
//     result = (
//       <React.Fragment>
//         {brokerageName === 'Interactive Brokers' && overrideError ? (
//           <Step>Connection successful</Step>
//         ) : (
//           <React.Fragment>
//             <Step>Failed to establish connection :(</Step>
//             <ShadowBox>
//               {errorDisplay}
//               <Button onClick={() => dispatch(push('/settings'))}>
//                 Go to Settings
//               </Button>
//             </ShadowBox>
//           </React.Fragment>
//         )}
//       </React.Fragment>
//     );
//   }
// }
export default BrokeragesOauthPage;
