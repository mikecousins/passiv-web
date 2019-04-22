import React from 'react';

import {
  Symbol,
  TradeRow,
  ColumnErrorDescription,
  ColumnErrorSymbol,
  ErrorTitle,
} from '../styled/Group';

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
