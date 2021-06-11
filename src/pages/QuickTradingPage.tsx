import React, { useState } from 'react';
import { Button, SmallButton } from '../styled/Button';

import { A, P, H1, H2, H3 } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';

import QuestradeLogo from '../assets/images/questrade-logo.png';
import AlpacaLogo from '../assets/images/alpaca-logo.png';
import InteractiveBrokersLogo from '../assets/images/ibkr-logo.png';
import TDAmeritradeLogo from '../assets/images/tda-logo.png';
import Grid from '../styled/Grid';
import { LogoContainer } from '../styled/Setup';
import styled from '@emotion/styled';
import { BackButton } from '../components/ModelPortfolio';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PortfolioGroupCash from '../components/PortfolioGroupDetails/PortfolioGroupCash';
import SymbolSelector from '../components/PortfolioGroupTargets/TargetBar/SymbolSelector';
import { Form, Formik } from 'formik';
import { StyledSelect } from '../components/PortfolioGroupSettings/OrderTargetAllocations';
import AccountHoldings from '../components/AccountHoldings';

const MainContainer = styled(ShadowBox)`
  input[type='password'] {
    background-color: white;
    padding: 5px;
    border: 1px solid;
    margin-bottom: 20px;
    display: block;
  }
  input[type='number'] {
    background-color: white;
    padding: 5px;
    border: 1px solid;
    margin-bottom: 20px;
  }
  input[type='radio'] {
    background-color: white;
    padding: 5px;
    margin-bottom: 20px;
    margin-right: 5px;
    label {
      font-size: 15px;
    }
  }
`;

const Broker = styled(ShadowBox)`
  cursor: pointer;
`;
const Accounts = styled.ul`
  button {
    border: 1px solid var(--brand-blue);
    background-color: transparent;
    color: var(--brand-blue);
    padding: 2px 30px;
  }
  li {
    margin-bottom: 20px;
  }
`;

const Steps = styled(Grid)`
  grid-gap: 0 !important;
  margin-top: 20px;
`;

type StepProps = {
  active: boolean;
};
const Step = styled.div<StepProps>`
  cursor: pointer;
  text-align: center;
  padding: 10px 0px;
  background-color: white;
  border-bottom: ${(props) => props.active && '3px solid var(--brand-green)'};
  border-right: ${(props) =>
    props.active && '3px solid rgba(100, 100, 111, 0.08)'};
  h2 {
    font-weight: 400;
  }
  div {
    font-size: 30px;
    text-align: center;
    color: white;
  }
`;

const QuickTradingPage = () => {
  const [status, setStatus] = useState('none');
  const [accountSelected, setAccountSelected] = useState('');
  const [activeTab, setActiveTab] = useState(1);

  let result = (
    <div>
      <Button onClick={() => setStatus('pin')} style={{ marginRight: '10px' }}>
        Login with your PIN
      </Button>
      <A onClick={() => setStatus('new')}>Create an account quickly</A>
    </div>
  );

  switch (status) {
    case 'pin':
      result = (
        <div>
          <form>
            <input type="password" placeholder="Enter your PIN" />
            <SmallButton onClick={() => setStatus('4')}>Enter</SmallButton>
          </form>
        </div>
      );
      break;
    case 'new':
      result = (
        <div>
          <H2 style={{ margin: '30px 0px' }}>Start by creatin a Trading PIN</H2>
          <div>
            <label htmlFor="PIN1">Enter your PIN:</label>
            <input type="password" name="PIN1" />
            <label htmlFor="PIN2">Confirm your PIN:</label>
            <input type="password" name="PIN2" />
            <small>
              *Note: Don't forget your PIN or you will need to reconnect your
              accounts.
            </small>
            <br />
            <SmallButton
              onClick={() => setStatus('2')}
              style={{ marginTop: '10px' }}
              type="button"
            >
              Register
            </SmallButton>
          </div>
        </div>
      );
      break;
    case '2':
      result = (
        <div>
          <P style={{ marginBottom: '10px' }}>
            Would you like to share your holdings data with X?
          </P>

          <div>
            <div style={{ marginBottom: '10px' }}>
              <input type="radio" id="yes" name="share-data" value="yes" />
              <label htmlFor="yes">Yes</label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input type="radio" id="no" name="share-data" value="no" />
              <label htmlFor="no">No</label>
            </div>
            <small>
              *Note: This will allow X to read your account positions and
              balances to provide you with addition of functionality.
            </small>
            <br />
            <SmallButton
              onClick={() => setStatus('3')}
              style={{ marginTop: '10px' }}
            >
              Continue
            </SmallButton>
          </div>
        </div>
      );
      break;
    case '3':
      result = (
        <div>
          <H3 style={{ marginBottom: '10px' }}>Select your broker: </H3>
          <Grid columns="repeat(4,1fr)">
            <Broker onClick={() => setStatus('4')}>
              <LogoContainer>
                {' '}
                <img alt="QuestradeLogo" src={QuestradeLogo} />
              </LogoContainer>
            </Broker>
            <Broker onClick={() => setStatus('4')}>
              <LogoContainer>
                {' '}
                <img alt="TDAmeritradeLogo" src={TDAmeritradeLogo} />
              </LogoContainer>
            </Broker>
            <Broker onClick={() => setStatus('4')}>
              <LogoContainer>
                {' '}
                <img
                  alt="InteractiveBrokersLogo"
                  src={InteractiveBrokersLogo}
                />
              </LogoContainer>
            </Broker>
            <Broker onClick={() => setStatus('4')}>
              <LogoContainer>
                {' '}
                <img alt="AlpacaLogo" src={AlpacaLogo} />
              </LogoContainer>
            </Broker>{' '}
          </Grid>
        </div>
      );
      break;
    case '4':
      result = (
        <div>
          <H3 style={{ marginBottom: '10px' }}>Your Accounts: </H3>
          <Accounts>
            <li>
              Margin - TDA{' '}
              <SmallButton
                onClick={() => {
                  setStatus('5');
                  setAccountSelected('Margin - TDA');
                }}
                style={{ marginLeft: '10px' }}
              >
                Trade
              </SmallButton>
            </li>
            <li>
              Margin - IBKR{' '}
              <SmallButton
                onClick={() => {
                  setStatus('5');
                  setAccountSelected('Margin - IBKR');
                }}
                style={{ marginLeft: '10px' }}
              >
                Trade
              </SmallButton>
            </li>
            <li>
              TFSA - Questrade{' '}
              <SmallButton
                onClick={() => {
                  setStatus('5');
                  setAccountSelected('TFSA - Questrade');
                }}
                style={{ marginLeft: '10px' }}
              >
                Trade
              </SmallButton>
            </li>
          </Accounts>
          <Button onClick={() => setStatus('3')}>
            Connect Another Account{' '}
          </Button>
        </div>
      );
      break;
    case '5':
      result = (
        <div>
          <BackButton>
            <A onClick={() => setStatus('4')}>
              <FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Accounts
            </A>
          </BackButton>
          <H2>{accountSelected}</H2>
          <Steps columns="1fr 1fr 1fr 1fr">
            <Step
              active={activeTab === 1 && true}
              onClick={() => setActiveTab(1)}
            >
              Trade
            </Step>

            <Step
              active={activeTab === 2 && true}
              onClick={() => setActiveTab(2)}
            >
              Positions
            </Step>
            <Step
              active={activeTab === 3 && true}
              onClick={() => setActiveTab(3)}
            >
              Orders
            </Step>
          </Steps>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <MainContainer background="var(--brand-light-green)">
      <H1>Fintech Trading By Passiv</H1>
      {result}
      <div
        style={{
          maxWidth: '75%',
          borderTopRightRadius: '0',
          borderTopLeftRadius: '0',
        }}
      >
        {status === '5' && (
          <ShadowBox>
            {activeTab === 1 && (
              <div>
                <PortfolioGroupCash
                  balances={[
                    {
                      currency: { id: 'x', code: 'CAD', name: 'cad' },
                      cash: 120000,
                    },
                    {
                      currency: { id: 'y', code: 'USD', name: 'cad' },
                      cash: 5000,
                    },
                  ]}
                  error={null}
                />
                <div>
                  <div style={{ marginBottom: '10px' }}>
                    <input type="radio" id="buy" name="trade" value="buy" />
                    <label htmlFor="buy">Buy</label>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <input type="radio" id="sell" name="trade" value="sell" />
                    <label htmlFor="sell">Sell</label>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      Symbol:{' '}
                      <SymbolSelector
                        value={undefined}
                        onSelect={(selected) => console.log(selected)}
                      />
                    </div>
                    <div>
                      <Formik initialValues={{}} onSubmit={() => {}}>
                        <Form onChange={() => console.log('selected')}>
                          <div style={{ margin: '10px 0px' }}>
                            Order Type:
                            <StyledSelect as="select" name="type">
                              <option value={'Market'} key={0}>
                                Market
                              </option>
                              <option value={'Limit'} key={1}>
                                Limit
                              </option>
                            </StyledSelect>
                          </div>
                          <div>
                            Quantity: <input type="number" />
                          </div>
                          <div>
                            Price: $<input type="number" />
                          </div>
                          <div style={{ margin: '10px 0px' }}>
                            Time to Force:
                            <StyledSelect as="select" name="time">
                              <option value={'Day'} key={0}>
                                Day
                              </option>
                              <option value={'GTC'} key={1}>
                                GTC
                              </option>
                              <option value={'FOK'} key={2}>
                                FOK
                              </option>
                            </StyledSelect>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                </div>
                <SmallButton onClick={() => setStatus('preview')}>
                  Preview Order
                </SmallButton>
              </div>
            )}
          </ShadowBox>
        )}
      </div>
    </MainContainer>
  );
};

export default QuickTradingPage;
