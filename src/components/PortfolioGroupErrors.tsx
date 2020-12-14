import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ErrorContainer, Symbol } from '../styled/Group';
import { H3, P, Table, A } from '../styled/GlobalElements';
import { Error } from '../types/groupInfo';
import PreLoadLink from './PreLoadLink';
import { HELP_PATH } from '../apps/Paths';

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
            <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if this
            persists.
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
              <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if you
              think this is a mistake.
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
              <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if
              this persists.
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
              <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if
              this persists.
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
              <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink>.
            </P>
          </React.Fragment>
        );
        break;
      default:
        errorDisplay = (
          <P>
            We encountered an unexpected error while accessing your account
            information. Please try again later or{' '}
            <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if this
            persists.
          </P>
        );
        break;
    }
  }

  if (error.code === 'IBKR_CAN') {
    error_header = 'Interactive Brokers Canada is not supported';
    errorDisplay = (
      <React.Fragment>
        <P>
          It appears that one or more of your accounts are with Interactive
          Brokers Canada. Passiv does not support placing orders through
          Interactive Brokers Canada, but you can still place those orders
          manually.
        </P>
        <P>
          If you believe this message is in error (for example, you don't
          actually have an account with Interactive Brokers Canada), please{' '}
          <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink>.
        </P>
      </React.Fragment>
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
