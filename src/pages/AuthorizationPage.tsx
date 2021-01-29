import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { push } from 'connected-react-router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  selectIsAuthorized,
  selectBrokerages,
  selectAuthorizations,
  selectMaintenanceBrokerages,
} from '../selectors';
import { selectUserPermissions } from '../selectors/subscription';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { P } from '../styled/GlobalElements';
import { postData } from '../api';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';
import QuestradeLogo from '../assets/images/questrade-logo.png';
import AlpacaLogo from '../assets/images/alpaca-logo.png';
import InteractiveBrokersLogo from '../assets/images/ibkr-logo.png';
import TDAmeritradeLogo from '../assets/images/tda-logo.png';
import TradierLogo from '../assets/images/tradier-logo.png';
import WealthicaLogo from '../assets/images/wealthica-logo.png';
import ZerodhaLogo from '../assets/images/zerodha-logo.png';
import { Brokerage as BrokerageType } from '../types/brokerage';
import { toast } from 'react-toastify';

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
import { selectShowProgressFeature } from '../selectors/features';

const Brokerage = styled.div``;

type Props = {
  onboarding?: boolean;
};

const AuthorizationPage = ({ onboarding }: Props) => {
  const authorized = useSelector(selectIsAuthorized);
  const brokerages = useSelector(selectBrokerages);
  const userPermissions = useSelector(selectUserPermissions);
  const authorizations = useSelector(selectAuthorizations);
  const maintenanceBrokerages = useSelector(selectMaintenanceBrokerages);
  const showProgressFeature = useSelector(selectShowProgressFeature);
  const { brokerage } = useParams();
  const dispatch = useDispatch();

  const canAddMultipleConnections = () => {
    if (userPermissions === null) {
      return false;
    }
    let filtered_permissions = userPermissions.filter(
      (permission) => permission === 'can_add_multiple_connections',
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

  const checkBrokerageMaintenance = (brokerage: BrokerageType) => {
    if (
      maintenanceBrokerages.find((b: BrokerageType) => b.id === brokerage.id)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const startConnection = (brokerageName: string, connectionType: string) => {
    const brokerage =
      brokerages &&
      brokerages.find((brokerage) => brokerage.name === brokerageName);
    if (brokerage) {
      if (checkBrokerageMaintenance(brokerage) === true) {
        toast.error(
          `${brokerage.name} is currently undergoing maintenance and cannot establish new connections at this time. Please try again later.`,
        );
      } else {
        postData(`/api/v1/brokerages/${brokerage.id}/authorize/`, {
          type: connectionType,
        }).then((response) => {
          window.location = response.data.url;
        });
      }
    }
  };

  const brokerageOptions: any[] = [
    {
      id: 'questrade',
      name: 'Questrade',
      connect: () => {
        startConnection('Questrade', 'read');
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
        startConnection('Alpaca', 'trade');
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
        startConnection('Interactive Brokers', 'trade');
      },
      openURL: 'https://www.interactivebrokers.com/en/home.php',
      major: true,
      logo: InteractiveBrokersLogo,
      description: (
        <P>
          Interactive Brokers is a brokerage that operates in 200+ countries.
          IBKR's low fees and advanced features will delight traders old and
          new.
        </P>
      ),
    },
    {
      id: 'tdameritrade',
      name: 'TD Ameritrade',
      connect: () => {
        startConnection('TD Ameritrade', 'trade');
      },
      openURL: 'https://www.tdameritrade.com/home.page',
      major: true,
      logo: TDAmeritradeLogo,
      description: (
        <P>
          TD Ameritrade is one of the largest discount brokerages in the U.S.
          with over $1.3 trillion in client assets.
        </P>
      ),
    },
    {
      id: 'tradier',
      name: 'Tradier',
      connect: () => {
        startConnection('Tradier', 'trade');
      },
      openURL: 'https://brokerage.tradier.com/signup?platform=109',
      major: true,
      logo: TradierLogo,
      description: (
        <P>
          Tradier is a REST-based, open, and secure API for investors, advisors,
          and traders.
        </P>
      ),
    },
    {
      id: 'wealthica',
      name: 'Wealthica',
      connect: () => {
        startConnection('Wealthica', 'read');
      },
      openURL: 'https://wealthica.com/',
      major: true,
      logo: WealthicaLogo,
      description: (
        <P>
          Wealthica is a 3rd party account aggregator for your brokerage
          account.
        </P>
      ),
    },
    {
      id: 'zerodha',
      name: 'Zerodha',
      connect: () => {
        startConnection('Zerodha', 'trade');
      },
      openURL: 'https://kite.trade/connect/login?api_key=pnriechdkzx5ipvq&v=3',
      major: true,
      logo: ZerodhaLogo,
      description: (
        <P>
          Zerodha is the largest stock brokerage firm in India with more than 4
          million clients.
        </P>
      ),
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
      <React.Fragment>
        <Container2Column>
          {brokerageOptions.map((brokerage: any) => {
            let contents = (
              <AuthBox key={brokerage.id} onClick={brokerage.connect}>
                <LogoContainer>
                  <img src={brokerage.logo} alt={`${brokerage.name} Logo`} />
                </LogoContainer>
                <AuthLink>Connect {brokerage.name}</AuthLink>
              </AuthBox>
            );
            return contents;
          })}
        </Container2Column>
      </React.Fragment>
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
              <VerticalPadding>
                <Link style={aDarkStyle} to="/app/settings">
                  Back
                </Link>
              </VerticalPadding>
            </LinkContainer>
          )}
        </React.Fragment>
      </React.Fragment>
    );
  }

  return (
    <ShadowBox background="#2a2d34">
      {output}
      {showProgressFeature && <OnboardingProgress step={2} />}
    </ShadowBox>
  );
};

export default AuthorizationPage;
