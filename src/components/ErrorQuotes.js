import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { ErrorsContainer, Symbol } from '../styled/Group';
import { H3, P, Title } from '../styled/GlobalElements';

const ErrorQuotes = error => {
  const symbolsWithErrors = error.error.symbolsWithErrors;

  const ErrorSymbolQuoteRender = symbolWithError => (
    <React.Fragment>
      <Title> Hello this is a test </Title>
      <Symbol> Mhmmm </Symbol>
    </React.Fragment>
  );

  const renderedErrors = symbolsWithErrors => {
    symbolsWithErrors.map(symbol => <ErrorSymbolQuoteRender />);
  };

  return (
    <ErrorsContainer>
      <H3>
        <FontAwesomeIcon icon={faExclamationTriangle} /> Something Went Wrong!{' '}
      </H3>
      <P> We were unable to get market quotes for the following symbols: </P>
      {renderedErrors}
    </ErrorsContainer>
  );
};

export default ErrorQuotes;
