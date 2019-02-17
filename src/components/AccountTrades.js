import React from 'react';
import RebalanceWidget from './RebalanceWidget';
import { H3, Title } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import { TradesContainer, TradeRow, Heading, Symbol, ColumnSymbol, ColumnUnits, ColumnPrice } from '../styled/Group';

export const AccountTrades = ({ trades }) => {
  let tradeList = null;
  if (trades && trades.trades.length > 0) {
    tradeList = trades.trades.map(trade => (
      <TradeRow key={trade.id}>
        <Heading>
          <H3>{trade.action}</H3>
        </Heading>
        <ColumnSymbol>
          <Title>{trade.universal_symbol.description}</Title>
          <Symbol>{trade.universal_symbol.symbol}</Symbol>
        </ColumnSymbol>
        <ColumnUnits>
          <Title>Units</Title>
          <div>{trade.units}</div>
        </ColumnUnits>
        <ColumnPrice>
          <Title>Price</Title>
          <div>${trade.price}</div>
        </ColumnPrice>
      </TradeRow>
    ))
  }

  return (
    <TradesContainer>
      <ShadowBox>
        {tradeList}
      </ShadowBox>
      <RebalanceWidget
        trades={trades}
      />
    </TradesContainer>
  )
};

export default AccountTrades;
