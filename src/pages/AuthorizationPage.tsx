import React from 'react';
import { useSelector } from 'react-redux';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectIsAuthorized, selectBrokerages } from '../selectors';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { H2, H3, P } from '../styled/GlobalElements';
import { postData } from '../api';
import { Button } from '../styled/Button';
import PlaidConnectPage from './PlaidConnectPage';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';
import QuestradeLogo from '../assets/images/questrade-logo.png';
import AlpacaLogo from '../assets/images/alpaca-logo.png';

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
      major: true,
      logo: QuestradeLogo,
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
      major: true,
      logo: AlpacaLogo,
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

  if (brokerage) {
    contents = brokerageOptions.find(b => b.id === brokerage).view();
  }

  return <ShadowBox background="#2a2d34">{contents}</ShadowBox>;
};

export default AuthorizationPage;
