import { useSelector } from 'react-redux';
import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectIsAuthorized, selectBrokerages } from '../selectors';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { H2, P } from '../styled/GlobalElements';
import { postData } from '../api';
import { Button } from '../styled/Button';
// import PlaidConnectPage from './PlaidConnectPage';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';
import QuestradeLogo from '../assets/images/questrade-logo.png';
import AlpacaLogo from '../assets/images/alpaca-logo.png';

const aDarkStyle = {
  color: 'white',
};

const h2DarkStyle = {
  color: 'white',
  paddingBottom: '20px',
};

const pDarkStyle = {
  color: 'white',
  paddingBottom: '20px',
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

const LogoBox = styled.div`
  margin-right: 20px;
  height: 150px;
  width: 250px;
`;

const GrowBox = styled.div`
  flex-grow: 1;
`;

const LogoContainer = styled.div`
  width: 80%;
  img {
    width: 100%;
    margin-left: 10%;
    margin-right: 10%;
  }
`;

const AuthorizationPage = () => {
  const authorized = useSelector(selectIsAuthorized);
  const brokerages = useSelector(selectBrokerages);
  const { brokerage } = useParams();

  const brokerageOptions: any[] = [
    {
      id: 'questrade',
      name: 'Questrade',
      view: () => {
        return (
          <Button
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
            Connect to Questrade
          </Button>
        );
      },
      openURL: 'https://www.questrade.com/account-selection?oaa_promo=bgudhqhm',
      major: true,
      logo: QuestradeLogo,
      description: (
        <React.Fragment>
          <P>
            Rated as Canada's best online brokerage by MoneySense in 2019,
            Questrade is a great choice for Canadians to manage their wealth.
            Questrade has low fees, excellent customer support, and will even
            cover your account transfer costs up to $150.
          </P>
        </React.Fragment>
      ),
    },
    {
      id: 'alpaca',
      name: 'Alpaca',
      view: () => {
        return (
          <Button
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
            Connect to Alpaca
          </Button>
        );
      },
      openURL: 'https://app.alpaca.markets/signup',
      major: true,
      logo: AlpacaLogo,
      description: (
        <React.Fragment>
          <P>
            Alpaca is a commission-free API-first brokerage servicing the USA
            and beyond.
          </P>
        </React.Fragment>
      ),
    },
    // {
    //   id: 'plaid',
    //   name: 'Other',
    //   view: () => {
    //     return <PlaidConnectPage />;
    //   },
    //   major: false,
    //   logo: null,
    // },
  ];

  if (authorized === undefined || !brokerages) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  let contents = (
    <React.Fragment>
      <H2 style={h2DarkStyle}>Connect your brokerage:</H2>
      <P style={pDarkStyle}>
        In order to help you manage your portfolio, Passiv needs to connect to
        your brokerage account. Connecting your account does not allow Passiv to
        see your login information.
      </P>
      <Container2Column>
        {brokerageOptions.map((brokerage: any) => {
          return (
            <ShadowBox>
              <LogoContainer>
                <img src={brokerage.logo} alt={`${brokerage.name} Logo`} />
              </LogoContainer>
              {brokerage.view()}
            </ShadowBox>
          );
        })}
      </Container2Column>
    </React.Fragment>
  );

  console.log('brokerage', brokerage);
  var output = null;
  if (brokerage === 'open') {
    output = (
      <React.Fragment>
        <H2 style={h2DarkStyle}>Open a brokerage account</H2>
        <P style={pDarkStyle}>
          Passiv is a service that helps you manage your portfolio in a
          brokerage account. Since Passiv is not a brokerage firm, you will need
          your own brokerage account in order to use Passiv. We partner with
          select brokerage firms in order to provide the best experience.
        </P>
        <P style={pDarkStyle}>
          Follow a link below to create a brokerage account with one of our
          partners.
        </P>
        {brokerageOptions.map((brokerage: any) => {
          return (
            <ShadowBox>
              <Container1Column>
                <LogoBox>
                  <LogoContainer>
                    <img src={brokerage.logo} alt={`${brokerage.name} Logo`} />
                  </LogoContainer>
                  <Button
                    onClick={() => {
                      window.location = brokerage.openURL;
                    }}
                  >
                    Open a
                    {'aeiou'.includes(brokerage.name[0].toLowerCase()) && 'n'}{' '}
                    {brokerage.name} Account
                  </Button>
                </LogoBox>
                <GrowBox>{brokerage.description}</GrowBox>
              </Container1Column>
            </ShadowBox>
          );
        })}
        <Link style={aDarkStyle} to="/app/connect">
          Back
        </Link>
      </React.Fragment>
    );
  } else {
    output = (
      <React.Fragment>
        {contents}
        <Link style={aDarkStyle} to="/app/connect/open">
          I don't have a brokerage account.
        </Link>
      </React.Fragment>
    );
  }

  return <ShadowBox background="#2a2d34">{output}</ShadowBox>;
};

export default AuthorizationPage;
