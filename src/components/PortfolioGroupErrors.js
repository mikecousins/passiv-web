import React from 'react';
import { Link } from 'react-router-dom';
// import ErrorQuote from './ErrorQuote';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { ErrorContainer, Symbol } from '../styled/Group';

import { H3, P, Table } from '../styled/GlobalElements';

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

const PortfolioGroupErrors = props => {
  const { error } = props;

  let errorDisplay = null;
  if (error) {
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
        let renderedSymbols = error.meta.symbols.map(symbol => {
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

  return (
    <ErrorContainer>
      <H3>
        <FontAwesomeIcon icon={faExclamationTriangle} /> Something Went Wrong!{' '}
        {errorDisplay}
      </H3>
    </ErrorContainer>
  );

  // const symbolsWithErrors = error.symbolsWithErrors;
  // const symbolsIds = symbolsWithErrors.map(
  //   s => s[Object.getOwnPropertyNames(s)],
  // );
  // const symbolDetails = symbolsIds.map(
  //   id => symbols.filter(symbol => symbol.id === id)[0],
  // );
  //
  //
  // return !error ? null : (
  //   <ErrorsContainer>
  //     <H3>
  //       <FontAwesomeIcon icon={faExclamationTriangle} /> Something Went Wrong!{' '}
  //     </H3>
  //     <P> We were unable to get market quotes for the following symbols: </P>
  //
  //     {symbolDetails.map(detail => (
  //       <ErrorQuote key={detail.id} detail={detail} />
  //     ))}
  //
  //     <P>
  //       {' '}
  //       This might be due to the market being closed or the symbol being
  //       delisted. If the symbol was delisted, you can exclude the asset from the
  //       calculations. <Link to="/app/help">Contact support</Link> if this is a
  //       bug or if you have any questions.
  //     </P>
  //   </ErrorsContainer>
  // );
};

export default PortfolioGroupErrors;
