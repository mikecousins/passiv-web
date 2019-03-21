import React from 'react';
import RebalanceWidget from './RebalanceWidget';
import { H2, H3, Title } from '../styled/GlobalElements';
import { TradesContainer, TradeType, TradeRow, Heading, Symbol, ColumnSymbol, ColumnUnits, ColumnPrice } from '../styled/Group';

export const AccountTrades = ({ trades, groupId }) => {
  let buysListRender = null;
  let sellsListRender = null;
  if (trades && trades.trades.length > 0) {

    const tradeRender = trade => (
      <TradeRow key={trade.id}>
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
    )

    const tradeListRender = (type, tradeList) => {
      const renderedTradeList = tradeList.map(tradeRender);
      return (
        <TradeType >
          <H3>{type}</H3>
          {renderedTradeList}
        </TradeType>
      )
    }
    let sortedTrades = trades.trades.sort((a, b) => a.sequence > b.sequence);
    const buysList = sortedTrades.filter(trade => trade.action === 'BUY');
    const sellsList = sortedTrades.filter(trade => trade.action === 'SELL');



    if (buysList.length > 0) {
      buysListRender = tradeListRender('BUY', buysList);
    }

    if (sellsList.length > 0) {
      sellsListRender = tradeListRender('SELL', sellsList);
    }

  }

  return (
    <TradesContainer>
      <H2>Trades</H2>
        {sellsListRender}
        {buysListRender}
        <RebalanceWidget
        trades={trades}
        groupId={groupId}
      />
    </TradesContainer>
  )
};

export default AccountTrades;
