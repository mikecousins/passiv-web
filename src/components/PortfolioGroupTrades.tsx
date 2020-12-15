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
import { ContextualMessageWrapper } from './ContextualMessageWrapper';
import styled from '@emotion/styled';
import Tour from './Tour/Tour';
import { Link } from 'react-router-dom';
import {
  selectShowQuestradeOffer,
  selectSubscription,
} from '../selectors/subscription';

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

const EliteFeatureTile = styled(H2)`
  text-align: center;
`;
const EliteUpgradeBtn = styled(Link)`
  margin-top: 50px;
  border-radius: 0.5rem;
  background-color: var(--brand-green);
  padding: 10px;
  color: white;
  font-size: 15px;
  font-weight: 900;
  text-decoration: none;
`;
export const PortfolioGroupTrades = ({
  trades,
  groupId,
  error,
  onClose,
}: Props) => {
  const accounts = useSelector(selectAccounts);
  const settings = useSelector(selectCurrentGroupSettings);
  const showQuestradeOffer = useSelector(selectShowQuestradeOffer);
  const subscription = useSelector(selectSubscription);
  const [tradesSubmitted, setTradesSubmitted] = useState(false);
  const [tradesCache, setTradesCache] = useState(null);

  const groupAccounts = accounts.filter((a) => a.portfolio_group === groupId);

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

  const TOUR_STEPS = [
    {
      target: '.tour-trades',
      content:
        ' Passiv displays the trades needed to maximize your accuracy based on your targets, current holdings, your available cash, and your settings.',
      placement: 'right',
    },
    {
      target: '.tour-one-click-trade',
      title: (
        <>
          <span style={{ display: 'none' }}>.</span>
          <EliteFeatureTile>Elite Feature</EliteFeatureTile>
        </>
      ),
      content: (
        <>
          <div>
            Review your recommended trades by clicking Preview Orders and click
            Confirm to rebalance your portfolio in{' '}
            <a href="https://passiv.com/help/tutorials/how-to-use-one-click-trades/">
              one-click
            </a>
            .
          </div>
          <br />
          {!showQuestradeOffer ? (
            <EliteUpgradeBtn to="/app/questrade-offer">
              Upgrade to Elite
            </EliteUpgradeBtn>
          ) : (
            subscription?.type === 'free' && (
              <EliteUpgradeBtn to="/app/settings">
                Upgrade to Elite
              </EliteUpgradeBtn>
            )
          )}
        </>
      ),
      placement: 'right',
    },
  ];

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
        const account = accounts.find((a) => a.id === trade.account);
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
      <>
        <Tour steps={TOUR_STEPS} name="trades_tour" />
        <TradesContainer className="tour-trades">
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
      </>
    );
  } else {
    if (!error) {
      return (
        <ContextualMessageWrapper name={'no_trades'}>
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
                      href="https://passiv.com/help/tutorials/how-to-allow-selling-to-rebalance"
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
              trades={trades!.trades}
            />
          </TradesContainer>
        </ContextualMessageWrapper>
      );
    }
  }
  return null;
};

export default PortfolioGroupTrades;
