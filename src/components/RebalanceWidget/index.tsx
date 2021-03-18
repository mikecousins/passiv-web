import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { loadGroup, loadGroupAndAccounts, loadIncentives } from '../../actions';
import { getData, postData, putData } from '../../api';
import { selectSettings } from '../../selectors';
import { selectShowQuestradeOffer } from '../../selectors/subscription';
import { H2, P, A, Title } from '../../styled/GlobalElements';
import {
  Symbol,
  ColumnSymbolSmall,
  ColumnUnits,
  ColumnAction,
  ColumnStatus,
} from '../../styled/Group';
import OrderImpacts from './OrderImpacts';
import {
  ConfirmContainer,
  OrderContainer,
  SummaryContainer,
  ModifiedTradeRow,
} from './styles';
import ErrorMessage from './ErrorMessage';
import { Button } from '../../styled/Button';
import UpgradeIdea from '../UpgradeIdea';
import { selectLimitOrdersFeature } from '../../selectors/features';
import PreLoadLink from '../PreLoadLink';
import { SETTINGS_PATH } from '../../apps/Paths';
import { selectAccounts } from '../../selectors/accounts';
import {
  selectCurrentGroupSettings,
  selectCurrentGroupId,
} from '../../selectors/groups';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

type Props = {
  groupId: string;
  trades: any;
  onClose?: () => void;
  showQuestradeOffer?: boolean;
  tradesTrigger: () => void;
  tradesUntrigger: () => void;
};

const RebalanceWidget = ({
  groupId,
  trades,
  onClose,
  tradesTrigger,
  tradesUntrigger,
}: Props) => {
  const showQuestradeOffer = useSelector(selectShowQuestradeOffer);
  const showLimitOrdersFeature = useSelector(selectLimitOrdersFeature);

  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  let hasFreeOneClicks = false;

  const [validatingOrders, setValidatingOrders] = useState(false);
  const [placingOrders, setPlacingOrders] = useState(false);
  const [orderSummary, setOrderSummary] = useState<any>();
  const [orderResults, setOrderResults] = useState<any>();
  const [error, setError] = useState<any>();
  const accounts = useSelector(selectAccounts);
  const groupSettings = useSelector(selectCurrentGroupSettings);
  const currentGroupId = useSelector(selectCurrentGroupId);

  const hasOnlyNonTradableTrades = trades.trades.every((trade: any) => {
    return (
      trade.account.brokerage_authorization.brokerage.allows_trading === false
    );
  });

  const groupAccounts = accounts.filter((a) => a.portfolio_group === groupId);

  // check if the group contains only Wealthica accounts
  let onlyWealthica = false;
  const wealthicaAccounts = groupAccounts.filter(
    (acc: any) => acc.meta.institution_name === 'Wealthica',
  );
  if (
    wealthicaAccounts?.length > 0 &&
    wealthicaAccounts?.length === groupAccounts.length
  ) {
    onlyWealthica = true;
  }

  const reloadData = () => {
    dispatch(loadGroupAndAccounts({ ids: [groupId] }));
    dispatch(loadIncentives());
  };

  const validateOrders = () => {
    setValidatingOrders(true);
    getData(
      `/api/v1/portfolioGroups/${groupId}/calculatedtrades/${trades.id}/impact`,
    )
      .then((response) => {
        setValidatingOrders(false);
        setOrderSummary(response.data);
        setError(null);
      })
      .catch((error) => {
        setValidatingOrders(false);
        setOrderSummary(null);
        setError(error.response.data);
      });
  };

  const confirmOrders = () => {
    setPlacingOrders(true);
    tradesTrigger();
    postData(
      `/api/v1/portfolioGroups/${groupId}/calculatedtrades/${trades.id}/placeOrders`,
      {},
    )
      .then((response) => {
        setPlacingOrders(false);
        setOrderResults(response.data);
        setError(null);
        reloadData();
      })
      .catch((error) => {
        setPlacingOrders(false);
        setOrderResults(null);
        setError(error.response.data);
        reloadData();
      });
  };

  const cancelOrders = () => {
    setPlacingOrders(false);
    setValidatingOrders(false);
    setOrderSummary(null);
    setOrderResults(null);
    tradesUntrigger();
    setError(null);
  };

  const closeWidget = useCallback(() => {
    setPlacingOrders(false);
    setValidatingOrders(false);
    setOrderSummary(null);
    setOrderResults(null);
    tradesUntrigger();
    setError(null);

    // execute callback
    if (onClose) {
      onClose();
    }
  }, [onClose, tradesUntrigger]);

  useEffect(() => {
    if (currentGroupId !== null) {
      closeWidget();
    }
  }, [currentGroupId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleHideTrades = () => {
    let today = new Date();
    today.setHours(today.getHours() + 48);
    const twoDays = format(today, 'yyyy-MM-dd');

    if (groupSettings) {
      groupSettings.hide_trades_until = twoDays;
      putData(`/api/v1/portfolioGroups/${groupId}/settings/`, groupSettings)
        .then(() => {
          dispatch(loadGroup({ ids: [groupId] }));
        })
        .catch(() => {
          toast.error('Failed to update settings');
        });
    }
  };

  let orderValidation = (
    <div>
      <Button onClick={validateOrders} className="tour-one-click-trade">
        Preview Orders
      </Button>
    </div>
  );

  // if the group has only Wealthica accounts, then don't show the Preview Order button and instead show the hide trades for 48 hours button
  if (onlyWealthica || hasOnlyNonTradableTrades) {
    orderValidation = (
      <div>
        <A onClick={handleHideTrades}>
          I made these orders. Do not show Trades for the next 48 hours.
        </A>
      </div>
    );
  }

  if (showQuestradeOffer && !hasFreeOneClicks) {
    orderValidation = <UpgradeIdea />;
  }
  if (error) {
    orderValidation = (
      <ErrorMessage error={error} closeWidget={closeWidget} groupId={groupId} />
    );
  } else {
    if (validatingOrders) {
      orderValidation = (
        <OrderContainer>
          <P>
            Validating orders ...&nbsp;
            <FontAwesomeIcon icon={faSpinner} spin />
          </P>
        </OrderContainer>
      );
    } else if (orderSummary) {
      orderValidation = orderResults ? (
        <OrderContainer>
          <H2>Order Results</H2>
          <div>
            {orderResults.map((results: any) => {
              return (
                <ModifiedTradeRow key={results.trade}>
                  <ColumnAction>
                    <Title>Action</Title>
                    <div>{results.action}</div>
                  </ColumnAction>
                  <ColumnUnits>
                    <Title>Units</Title>
                    <div>{results.filled_units}</div>
                  </ColumnUnits>
                  <ColumnSymbolSmall>
                    <Title>Symbol</Title>
                    <Symbol>{results.universal_symbol.symbol}</Symbol>
                  </ColumnSymbolSmall>
                  <ColumnStatus>
                    <Title>Status</Title>
                    <div>{results.state}</div>
                  </ColumnStatus>
                </ModifiedTradeRow>
              );
            })}
          </div>
          <div>
            <ConfirmContainer>
              <Button onClick={closeWidget}>Okay!</Button>
            </ConfirmContainer>
          </div>
        </OrderContainer>
      ) : orderSummary ? (
        <OrderContainer>
          <H2>Order Summary</H2>
          {settings && settings.trade_with_limit_orders ? (
            <React.Fragment>
              <P>
                The trades listed above will be placed as limit orders on your
                brokerage account, with a{' '}
                {settings && settings.price_limit_threshold}% price limit
                threshold.
              </P>
              <div>
                <OrderImpacts impacts={orderSummary} />
              </div>
              <P>
                You can change the price limit threshold or switch over to
                market orders on your{' '}
                <PreLoadLink path={SETTINGS_PATH}>settings</PreLoadLink> page.
              </P>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <P>
                The trades listed above will be placed as market orders on your
                brokerage account.
              </P>
              <div>
                <OrderImpacts impacts={orderSummary} />
              </div>
              <P>
                Market orders may result in the price paid or received to be
                different from the last price quoted before the order was
                placed.{' '}
                <A
                  href="https://www.investopedia.com/terms/m/marketorder.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </A>
              </P>
              {showLimitOrdersFeature && (
                <P>
                  You can switch over to limit orders on your{' '}
                  <PreLoadLink path={SETTINGS_PATH}>settings</PreLoadLink> page.
                </P>
              )}
            </React.Fragment>
          )}

          <P>
            <A
              href="https://www.investopedia.com/terms/e/ecn.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Exchange and ECN fees
            </A>
            ,{' '}
            <A
              href="https://www.investopedia.com/terms/s/secfee.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              SEC fees
            </A>{' '}
            and for{' '}
            <A
              href="https://www.investopedia.com/terms/a/adr.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              ADRs
            </A>{' '}
            annual custody fees may apply. Commissions may vary if your order is
            filled over multiple days. Borrow fees may apply if you hold a short
            investment overnight.
          </P>
          {placingOrders ? (
            <div>
              <p>
                Placing orders ... <FontAwesomeIcon icon={faSpinner} spin />
              </p>
            </div>
          ) : (
            <div>
              <ConfirmContainer>
                <Button onClick={confirmOrders}>Confirm</Button>
                <A onClick={cancelOrders}>Cancel</A>
              </ConfirmContainer>
            </div>
          )}
        </OrderContainer>
      ) : (
        <div>
          <P>
            There is a problem with your orders:
            <ErrorMessage
              error={error}
              closeWidget={closeWidget}
              groupId={groupId}
            />
          </P>
        </div>
      );
    }
  }

  return <SummaryContainer>{orderValidation}</SummaryContainer>;
};

export default RebalanceWidget;
