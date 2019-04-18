import React from 'react';

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

const ErrorQuote = props => {
  return (
    <TradeRow>
      <ColumnErrorDescription>
        <ErrorTitle> {props.detail.description} </ErrorTitle>
      </ColumnErrorDescription>
      <ColumnErrorSymbol>
        <Symbol> {props.detail.symbol} </Symbol>
      </ColumnErrorSymbol>
    </TradeRow>
  );
};

export default ErrorQuote;
