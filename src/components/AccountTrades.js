import React from 'react';
import RebalanceWidget from './RebalanceWidget';
import { H3, Title } from '../styled/GlobalElements';
import { TradesContainer, TradeType, TradeRow, Heading, Symbol, ColumnSymbol, ColumnUnits, ColumnPrice } from '../styled/Group';

export const AccountTrades = ({ trades, groupId }) => {
  let buysList = null;
  let sellsList = null;
  if (trades && trades.trades.length > 0) {

    const tradeRender = trade => (
      <TradeType key={trade.id}>
        <Heading>
          <H3>{trade.action}</H3>
        </Heading>
        <TradeRow>
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
      </TradeType>
    )
    let sortedTrades = trades.trades.sort((a, b) => a.sequence > b.sequence);
    buysList = sortedTrades.filter(trade => trade.action === 'BUY').map(tradeRender);
    sellsList = sortedTrades.filter(trade => trade.action === 'SELL').map(tradeRender);
  }

  return (
    <TradesContainer>
        {sellsList}
        {buysList}
        <RebalanceWidget
        trades={trades}
        groupId={groupId}
      />
    </TradesContainer>
  )
};

export default AccountTrades;
