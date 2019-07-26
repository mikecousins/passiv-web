import React from 'react';
import { useSelector } from 'react-redux';
import RebalanceWidget from './RebalanceWidget';
import { H2, H3, Title } from '../styled/GlobalElements';
import {
  TradesContainer,
  TradeType,
  TradeRow,
  Symbol,
  ColumnSymbol,
  ColumnUnits,
  ColumnPrice,
  ColumnAccount,
} from '../styled/Group';
import Number from './Number';
import { selectAccounts } from '../selectors/accounts';

type Props = {
  trades: any;
  groupId: string;
  onClose?: () => void;
};

export const PortfolioGroupTrades = ({ trades, groupId, onClose }: Props) => {
  const accounts = useSelector(selectAccounts);
  let buysListRender = null;
  let sellsListRender = null;
  if (trades && trades.trades.length > 0 && accounts && accounts.length > 0) {
    const tradeRender = (trade: any) => {
      let accountName = '';
      if (accounts) {
        const account = accounts.find(a => a.id === trade.account);
        if (account) {
          accountName = account.name;
        }
      }
      return (
        <TradeRow key={trade.id}>
          <ColumnPrice>
            <Title>Price</Title>
            <div>
              <Number value={trade.price} currency isTrade={true} />
            </div>
          </ColumnPrice>
          <ColumnUnits>
            <Title>Units</Title>
            <div>{trade.units}</div>
          </ColumnUnits>
          <ColumnSymbol>
            <Title>{trade.universal_symbol.description}</Title>
            <Symbol>{trade.universal_symbol.symbol}</Symbol>
          </ColumnSymbol>
          <ColumnAccount>
            <Title>Account</Title>
            <div>{accountName}</div>
          </ColumnAccount>
        </TradeRow>
      );
    };

    const tradeListRender = (type: string, tradeList: any[]) => {
      const renderedTradeList = tradeList.map(tradeRender);
      return (
        <TradeType>
          <H3>{type}</H3>
          {renderedTradeList}
        </TradeType>
      );
    };
    let sortedTrades = trades.trades.sort(
      (a: any, b: any) => a.sequence > b.sequence,
    );
    const buysList = sortedTrades.filter(
      (trade: any) => trade.action === 'BUY',
    );
    const sellsList = sortedTrades.filter(
      (trade: any) => trade.action === 'SELL',
    );

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
      <RebalanceWidget trades={trades} groupId={groupId} onClose={onClose} />
    </TradesContainer>
  );
};

export default PortfolioGroupTrades;
