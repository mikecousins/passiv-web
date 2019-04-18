import React from 'react';
import ErrorQuote from './ErrorQuote';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import {
  ErrorsContainer,
  Symbol,
  TradeRow,
  ColumnErrorDescription,
  ColumnErrorSymbol,
  ErrorTitle,
} from '../styled/Group';

import { H3, P, Title } from '../styled/GlobalElements';

const ErrorQuotes = props => {
  const { error, symbols } = props;

  const symbolsWithErrors = error.symbolsWithErrors;
  const symbolsIds = symbolsWithErrors.map(
    s => s[Object.getOwnPropertyNames(s)],
  );
  const symbolDetails = symbolsIds.map(
    id => symbols.filter(symbol => symbol.id === id)[0],
  );

  return !error ? null : (
    <ErrorsContainer>
      <H3>
        <FontAwesomeIcon icon={faExclamationTriangle} /> Something Went Wrong!{' '}
      </H3>
      <P> We were unable to get market quotes for the following symbols: </P>

      {symbolDetails.map(detail => (
        <ErrorQuote key={detail.id} detail={detail} />
      ))}
    </ErrorsContainer>
  );
};

export default ErrorQuotes;
