import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { push } from 'connected-react-router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  selectIsAuthorized,
  selectBrokerages,
  selectAuthorizations,
} from '../selectors';
import { selectUserPermissions } from '../selectors/subscription';
import { selectConnectPlaidFeature } from '../selectors';
import PlaidConnection from '../components/PlaidConnection';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { P } from '../styled/GlobalElements';
import { postData } from '../api';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';
import QuestradeLogo from '../assets/images/questrade-logo.png';
import AlpacaLogo from '../assets/images/alpaca-logo.png';
import InteractiveBrokersLogo from '../assets/images/ibkr-logo.png';

import {
  aDarkStyle,
  Container2Column,
  Container1Column,
  GrowBox,
  LogoContainer,
  LinkContainer,
  AuthBox,
  OpenBox,
  AuthLink,
  AuthP,
  H1DarkStyle,
  H2DarkStyle,
  VerticalPadding,
} from '../styled/Setup';
import OnboardingProgress from '../components/OnboardingProgress';

const Brokerage = styled.div``;

type Props = {
  onboarding?: boolean;
};

const AuthorizationPage = ({ onboarding }: Props) => {
  const authorized = useSelector(selectIsAuthorized);
  const brokerages = useSelector(selectBrokerages);
  const userPermissions = useSelector(selectUserPermissions);
  const authorizations = useSelector(selectAuthorizations);
  const connectPlaidFeature = useSelector(selectConnectPlaidFeature);
  const [loading, setLoading] = useState(false);
  const { brokerage } = useParams();
  const dispatch = useDispatch();

  const canAddMultipleConnections = () => {
    if (userPermissions === null) {
      return false;
    }
    let filtered_permissions = userPermissions.filter(
      permission => permission === 'can_add_multiple_connections',
    );

    if (filtered_permissions.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  if (
    authorizations &&
    authorizations.length > 0 &&
    !canAddMultipleConnections()
  ) {
    dispatch(push('/app/settings'));
  }

  const brokerageOptions: any[] = [
    {
      id: 'questrade',
      name: 'Questrade',
      connect: () => {
        const brokerage =
          brokerages &&
          brokerages.find(brokerage => brokerage.name === 'Questrade');
        if (brokerage) {
          postData(`/api/v1/brokerages/${brokerage.id}/authorize/`, {
            type: 'read',
          }).then(response => {
            window.location = response.data.url;
          });
        }
      },
      openURL: 'https://www.questrade.com/account-selection?oaa_promo=passiv',
      major: true,
      logo: QuestradeLogo,
      description: (
        <P>
          Rated as Canada's best online brokerage by MoneySense in 2019,
          Questrade is a great choice for Canadians to manage their wealth.
          Questrade has low fees, excellent customer support, and will even
          cover your account transfer costs up to $150.
        </P>
      ),
    },
    {
      id: 'alpaca',
      name: 'Alpaca',
      connect: () => {
        const brokerage =
          brokerages &&
          brokerages.find(brokerage => brokerage.name === 'Alpaca');
        if (brokerage) {
          postData(`/api/v1/brokerages/${brokerage.id}/authorize/`, {
            type: 'trade',
          }).then(response => {
            window.location = response.data.url;
          });
        }
      },
      openURL: 'https://app.alpaca.markets/signup',
      major: true,
      logo: AlpacaLogo,
      description: (
        <P>
          Alpaca is a commission-free API-first brokerage servicing the USA and
          beyond.
        </P>
      ),
    },
    {
      id: 'interactivebrokers',
      name: 'IBKR',
      connect: () => {
        const brokerage =
          brokerages &&
          brokerages.find(
            brokerage => brokerage.name === 'Interactive Brokers',
          );
        if (brokerage) {
          postData(`/api/v1/brokerages/${brokerage.id}/authorize/`, {
            type: 'trade',
          }).then(response => {
            window.location = response.data.url;
          });
        }
      },
      openURL: 'https://www.interactivebrokers.com/en/home.php',
      major: true,
      logo: InteractiveBrokersLogo,
      description: <P>IB is great.</P>,
    },
  ];

  if (authorized === undefined || !brokerages) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  let contents = (
    <React.Fragment>
      <H1DarkStyle>Setup</H1DarkStyle>
      <H2DarkStyle>Connect Your Brokerage</H2DarkStyle>
      <AuthP>
        In order to help you manage your portfolio, Passiv needs to connect to
        your brokerage account. Connecting your account does not allow Passiv to
        see your login information.
      </AuthP>
      {loading ? (
        <H2DarkStyle>Establishing brokerage connection...</H2DarkStyle>
      ) : (
        <React.Fragment>
          <Container2Column>
            {brokerageOptions.map((brokerage: any) => (
              <AuthBox key={brokerage.id} onClick={brokerage.connect}>
                <LogoContainer>
                  <img src={brokerage.logo} alt={`${brokerage.name} Logo`} />
                </LogoContainer>
                <AuthLink>Connect {brokerage.name}</AuthLink>
              </AuthBox>
            ))}
          </Container2Column>
          {connectPlaidFeature && <PlaidConnection setLoading={setLoading} />}
        </React.Fragment>
      )}
    </React.Fragment>
  );

  var output = null;
  if (brokerage === 'open') {
    output = (
      <React.Fragment>
        <H1DarkStyle>Setup</H1DarkStyle>
        <H2DarkStyle>Open a brokerage account</H2DarkStyle>
        <AuthP>
          Passiv is a service that helps you manage your portfolio in a
          brokerage account. Since Passiv is not a brokerage firm, you will need
          your own brokerage account in order to use Passiv. We partner with
          select brokerage firms in order to provide the best experience.
        </AuthP>
        <AuthP>
          Follow a link below to create a brokerage account with one of our
          partners.
        </AuthP>
        {brokerageOptions.map((brokerage: any) => {
          return (
            <Brokerage>
              <Container1Column>
                <OpenBox
                  onClick={() => {
                    window.location = brokerage.openURL;
                  }}
                >
                  <LogoContainer>
                    <img src={brokerage.logo} alt={`${brokerage.name} Logo`} />
                  </LogoContainer>
                  <AuthLink>
                    Open
                    {'aeiou'.includes(brokerage.name[0].toLowerCase())}{' '}
                    {brokerage.name} Account
                  </AuthLink>
                </OpenBox>
                <GrowBox>{brokerage.description}</GrowBox>
              </Container1Column>
            </Brokerage>
          );
        })}
        <LinkContainer>
          <Link style={aDarkStyle} to="/app/connect">
            Back
          </Link>
        </LinkContainer>
      </React.Fragment>
    );
  } else {
    output = (
      <React.Fragment>
        {contents}
        <React.Fragment>
          {onboarding ? (
            <LinkContainer>
              <VerticalPadding>
                <Link style={aDarkStyle} to="/app/connect/open">
                  I don't have a brokerage account.
                </Link>
              </VerticalPadding>
              <VerticalPadding>
                <Link style={aDarkStyle} to="/app/welcome">
                  Back
                </Link>
              </VerticalPadding>
            </LinkContainer>
          ) : (
            <LinkContainer>
              <Link style={aDarkStyle} to="/app/settings">
                Back
              </Link>
            </LinkContainer>
          )}
        </React.Fragment>
      </React.Fragment>
    );
  }

  return (
    <ShadowBox background="#2a2d34">
      {output}
      <OnboardingProgress step={2} />
    </ShadowBox>
  );
};

export default AuthorizationPage;
