import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ErrorContainer, Symbol } from '../styled/Group';
import { H3, P, Table, A } from '../styled/GlobalElements';
import { Error } from '../types/groupInfo';

const Ticker = styled.div`
  padding-left: 20px;
  min-width: 20%;
`;

const Description = styled.div`
  min-width: 75%;
  font-size: 18px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
`;

type Props = {
  error: Error;
};

const PortfolioGroupErrors = ({ error }: Props) => {
  let errorDisplay = null;

  let error_header = 'Something went wrong!';

  if (error && error.meta) {
    switch (error.code) {
      case '2000':
        errorDisplay = (
          <P>
            We encountered an unexpected error while accessing your account
            information. Please try again later or{' '}
            <Link to="/app/help">contact support</Link> if this persists.
          </P>
        );
        break;
      case '2001':
        let renderedSymbols = error.meta.symbols.map((symbol: any) => {
          return (
            <React.Fragment>
              <Table>
                <Ticker>
                  <Symbol>{symbol.symbol}</Symbol>
                </Ticker>
                <Description>{symbol.description}</Description>
              </Table>
            </React.Fragment>
          );
        });
        errorDisplay = (
          <React.Fragment>
            <P>
              We were unable to obtain real-time price data for the following
              securities:
            </P>
            {renderedSymbols}
            <P>
              This could simply be a temporary issue with the availability of
              market data, or it could be the result of an issue with the
              security itself such as a delisting or other corporate action. You
              can always remove the security from your target portfolio to get
              past this error, or you can{' '}
              <Link to="/app/help">contact support</Link> if you think this is a
              mistake.
            </P>
          </React.Fragment>
        );
        break;
      case '2002':
        errorDisplay = (
          <React.Fragment>
            <P>
              We are having trouble communicating with the brokerage linked to
              this account.
            </P>
            <P>
              This is likely a temporary issue due to technical issues at the
              brokerage. Please try again later or{' '}
              <Link to="/app/help">contact support</Link> if this persists.
            </P>
          </React.Fragment>
        );
        break;
      case '3001':
        errorDisplay = (
          <React.Fragment>
            <P>
              Your brokerage's API is currently undergoing maintenance and we
              cannot pull your account information. Please try again later or{' '}
              <Link to="/app/help">contact support</Link> if this persists.
            </P>
          </React.Fragment>
        );
        break;
      case '3002':
        errorDisplay = (
          <React.Fragment>
            <P>
              We are having issues connecting to your brokerage account. This is
              most likely a temporary issue, but if it persists you may need to{' '}
              <A
                href="https://passiv.com/help/tutorials/how-to-manage-your-brokerage-connections"
                target="_blank"
                rel="noopener noreferrer"
              >
                reconnect your brokerage account
              </A>
              . Alternatively, you can always{' '}
              <Link to="/app/help">contact support</Link>.
            </P>
          </React.Fragment>
        );
        break;
      default:
        errorDisplay = (
          <P>
            We encountered an unexpected error while accessing your account
            information. Please try again later or{' '}
            <Link to="/app/help">contact support</Link> if this persists.
          </P>
        );
        break;
    }
  }

  if (error.code === 'IBKR_CAN') {
    error_header = 'IBKR Canada accounts not supported';
    errorDisplay = (
      <P>
        Passiv does not support IBKR Canada accounts. You can still make one
        click trades for your other accounts. However, trades for IBKR Canada
        accounts will not be placed.
        <br></br>
        <br></br>
        Please log into your{' '}
        <a href="https://www.interactivebrokers.com/en/home.php">
          IBKR account
        </a>{' '}
        and place them manually. <br></br>
        <br></br>
        If your account is not an IBKR Canada account{' '}
        <Link to="/app/help">contact support</Link> if you see this message.
      </P>
    );
  }

  return (
    <ErrorContainer>
      <H3>
        <FontAwesomeIcon icon={faExclamationTriangle} /> {error_header}{' '}
        {errorDisplay}
      </H3>
    </ErrorContainer>
  );
};

export default PortfolioGroupErrors;
