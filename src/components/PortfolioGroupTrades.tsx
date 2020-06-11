import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RebalanceWidget from './RebalanceWidget';
import { H2, H3, Title, P, BulletUL, A } from '../styled/GlobalElements';
import {
  TradesContainer,
  TradeType,
  TradeRow,
  Symbol,
  ColumnSymbol,
  ColumnSymbolWarning,
  ColumnUnits,
  ColumnPrice,
  ColumnAccount,
  ColumnWarning,
} from '../styled/Group';
import { selectCurrentGroupSettings } from '../selectors/groups';
import Tooltip from './Tooltip';
import Number from './Number';
import { selectAccounts } from '../selectors/accounts';
import TradesExplanation from './TradesExplanation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

type Props = {
  trades: any;
  groupId: string;
  error: any | null;
  onClose?: () => void;
};

const NoTradesNotice = styled.div`
  color: #232225;
  padding-top: 20px;
`;

const SectionHeader = styled(H2)`
  font-size: 20px;
`;

const AccuracyBullets = styled(BulletUL)`
  font-size: 18px;
  padding-top: 10px;
`;

export const PortfolioGroupTrades = ({
  trades,
  groupId,
  error,
  onClose,
}: Props) => {
  const accounts = useSelector(selectAccounts);
  const settings = useSelector(selectCurrentGroupSettings);
  const [tradesSubmitted, setTradesSubmitted] = useState(false);
  const [tradesCache, setTradesCache] = useState(null);

  const groupAccounts = accounts.filter(a => a.portfolio_group === groupId);

  const triggerTradesSubmitted = () => {
    setTradesSubmitted(true);
  };

  const untriggerTradesSubmitted = () => {
    setTradesSubmitted(false);
  };

  useEffect(() => {
    if (tradesSubmitted === false) {
      setTradesCache(trades);
    }
  }, [tradesSubmitted, trades]);

  let buysListRender = null;
  let sellsListRender = null;

  let tradesToRender = trades;
  if (tradesSubmitted === true) {
    tradesToRender = tradesCache;
  }
  if (
    tradesToRender &&
    tradesToRender.trades.length > 0 &&
    accounts &&
    accounts.length > 0
  ) {
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
          {trade.symbol_in_target ? (
            <ColumnSymbol>
              <Title>{trade.universal_symbol.description}</Title>
              <Symbol>{trade.universal_symbol.symbol}</Symbol>
            </ColumnSymbol>
          ) : (
            <React.Fragment>
              <ColumnSymbolWarning>
                <Title>{trade.universal_symbol.description}</Title>
                <Symbol>{trade.universal_symbol.symbol}</Symbol>
              </ColumnSymbolWarning>
              <ColumnWarning>
                <Title>Warning</Title>
                <div>
                  <Tooltip
                    label={
                      "Passiv is trying to sell all units of a security that is not in the target. If you actually want to keep this security but exclude it from Passiv's calculations, you can edit your target and flag this security as an excluded asset."
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </Tooltip>
                </div>
              </ColumnWarning>
            </React.Fragment>
          )}
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
    let sortedTrades = tradesToRender.trades.sort(
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

  if (tradesSubmitted || (tradesToRender && tradesToRender.trades.length)) {
    return (
      <TradesContainer>
        <H2>Trades</H2>
        {sellsListRender}
        {buysListRender}
        <RebalanceWidget
          trades={trades}
          groupId={groupId}
          onClose={onClose}
          tradesTrigger={() => triggerTradesSubmitted()}
          tradesUntrigger={() => untriggerTradesSubmitted()}
        />
        <TradesExplanation
          settings={settings}
          accounts={groupAccounts}
          container={true}
        />
      </TradesContainer>
    );
  } else {
    if (!error) {
      return (
        <TradesContainer>
          <H2>Trades</H2>
          <NoTradesNotice>
            <P>
              There are currently no trades available on your account. This
              means that this group is as close as possible to your target,
              taking into account the rebalancing rules set for this group.
            </P>
            <SectionHeader>Other ways to increase accuracy</SectionHeader>
            <AccuracyBullets>
              <li>Deposit cash into your brokerage account.</li>
              {settings != null && settings.buy_only && (
                <li>
                  Perform a full rebalance by selling overweight assets.{' '}
                  <A
                    href="https://getpassiv.com/help/tutorials/how-to-allow-selling-to-rebalance"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn How
                  </A>
                </li>
              )}
            </AccuracyBullets>
          </NoTradesNotice>
          <TradesExplanation
            settings={settings}
            accounts={groupAccounts}
            container={true}
          />
        </TradesContainer>
      );
    }
  }
  return null;
};

export default PortfolioGroupTrades;
