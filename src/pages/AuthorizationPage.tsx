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
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { H1, H2, P, A } from '../styled/GlobalElements';
import { postData } from '../api';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';
import QuestradeLogo from '../assets/images/questrade-logo.png';
import AlpacaLogo from '../assets/images/alpaca-logo.png';
import PlaidConnection from '../components/PlaidConnection';

const aDarkStyle = {
  color: 'white',
};

const Container2Column = styled.div`
  @media (min-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    > div {
      margin-right: 20px;
      height: 200px;
      width: 250px;
    }
  }
`;

const Container1Column = styled.div`
  display: flex;
`;

const GrowBox = styled.div`
  flex-grow: 1;
  color: #fff;
  padding-left: 30px;
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  padding: 6% 8%;
  img {
    max-width: 100%;
  }
`;

const LinkContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const AuthBox = styled(ShadowBox)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 30px;
`;

const OpenBox = styled(ShadowBox)`
  min-width: 400px;
  text-align: center;
  padding-bottom: 30px;
`;

const AuthLink = styled(A)`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0;
`;

const AuthP = styled(P)`
  max-width: 715px;
  color: #fff;
  padding-bottom: 20px;
`;

const H1DarkStyle = styled(H1)`
  color: #fff;
`;

const H2DarkStyle = styled(H2)`
  color: #04a287;
  font-size: 22px;
  padding-bottom: 20px;
`;

const Brokerage = styled.div``;

type Props = {
  onboarding?: boolean;
};

const AuthorizationPage = ({ onboarding }: Props) => {
  const authorized = useSelector(selectIsAuthorized);
  const brokerages = useSelector(selectBrokerages);
  const userPermissions = useSelector(selectUserPermissions);
  const authorizations = useSelector(selectAuthorizations);
  const { brokerage } = useParams();
  const [loading, setLoading] = useState(false);
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
      view: () => {
        return (
          <AuthLink
            onClick={() => {
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
            }}
          >
            Connect Questrade
          </AuthLink>
        );
      },
      openURL: 'https://www.questrade.com/account-selection?oaa_promo=bgudhqhm',
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
      view: () => {
        return (
          <AuthLink
            onClick={() => {
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
            }}
          >
            Connect Alpaca
          </AuthLink>
        );
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
        <Container2Column>
          {brokerageOptions.map((brokerage: any) => {
            return (
              <AuthBox key={brokerage.id}>
                <LogoContainer>
                  <img src={brokerage.logo} alt={`${brokerage.name} Logo`} />
                </LogoContainer>
                {brokerage.view()}
              </AuthBox>
            );
          })}
        </Container2Column>
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
                <OpenBox>
                  <LogoContainer>
                    <img src={brokerage.logo} alt={`${brokerage.name} Logo`} />
                  </LogoContainer>
                  <AuthLink
                    onClick={() => {
                      window.location = brokerage.openURL;
                    }}
                  >
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
        {!loading && (
          <React.Fragment>
            {onboarding ? (
              <LinkContainer>
                <Link style={aDarkStyle} to="/app/connect/open">
                  I don't have a brokerage account.
                </Link>
              </LinkContainer>
            ) : (
              <LinkContainer>
                <Link style={aDarkStyle} to="/app/settings">
                  Back
                </Link>
              </LinkContainer>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  return <ShadowBox background="#2a2d34">{output}</ShadowBox>;
};

export default AuthorizationPage;
