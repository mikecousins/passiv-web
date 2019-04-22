import React from 'react';
import { Link } from 'react-router-dom';
import ErrorQuote from './ErrorQuote';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { ErrorsContainer } from '../styled/Group';

import { H3, P } from '../styled/GlobalElements';

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

      <P>
        {' '}
        This might be due to the market being closed or the symbol being
        delisted. If the symbol was delisted, you can exclude the asset from the
        calculations. <Link to="/app/help">Contact support</Link> if this is a
        bug or if you have any questions.
      </P>
    </ErrorsContainer>
  );
};

export default ErrorQuotes;
