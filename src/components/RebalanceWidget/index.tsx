import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { loadGroupAndAccounts } from '../../actions';
import { getData, postData } from '../../api';
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
  IdeaBox,
  DetailRow,
  PSmall,
  ASmall,
  IdeaRow,
  IconBox,
  CopyBox,
} from './styles';
import ErrorMessage from './ErrorMessage';
import { Button } from '../../styled/Button';

type Props = {
  groupId: string;
  trades: any;
  onClose?: () => void;
  showQuestradeOffer?: boolean;
};

const RebalanceWidget = ({ groupId, trades, onClose }: Props) => {
  const showQuestradeOffer = useSelector(selectShowQuestradeOffer);
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  const [validatingOrders, setValidatingOrders] = useState(false);
  const [placingOrders, setPlacingOrders] = useState(false);
  const [orderSummary, setOrderSummary] = useState();
  const [orderResults, setOrderResults] = useState();
  const [error, setError] = useState();

  const reloadData = () => {
    dispatch(loadGroupAndAccounts());
  };

  const validateOrders = () => {
    setValidatingOrders(true);
    getData(
      `/api/v1/portfolioGroups/${groupId}/calculatedtrades/${trades.id}/impact`,
    )
      .then(response => {
        setValidatingOrders(false);
        setOrderSummary(response.data);
        setError(null);
      })
      .catch(error => {
        setValidatingOrders(false);
        setOrderSummary(null);
        setError(error.response.data);
      });
  };

  const confirmOrders = () => {
    setPlacingOrders(true);
    postData(
      `/api/v1/portfolioGroups/${groupId}/calculatedtrades/${trades.id}/placeOrders`,
      {},
    )
      .then(response => {
        setPlacingOrders(false);
        setOrderResults(response.data);
        setError(null);
        reloadData();
      })
      .catch(error => {
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
    setError(null);
  };

  const closeWidget = () => {
    setPlacingOrders(false);
    setValidatingOrders(false);
    setOrderSummary(null);
    setOrderResults(null);
    setError(null);

    // execute callback
    if (onClose) {
      onClose();
    }
  };

  let orderValidation = (
    <Button onClick={validateOrders}>Prepare Orders</Button>
  );
  if (showQuestradeOffer) {
    orderValidation = (
      <IdeaBox>
        <IdeaRow>
          <IconBox>
            <FontAwesomeIcon icon={faLightbulb} />
          </IconBox>
          <CopyBox>
            <P>
              Did you know that your account is eligible for a{' '}
              <strong>free</strong> upgrade to Passiv Elite?
            </P>
          </CopyBox>
        </IdeaRow>

        <DetailRow>
          <PSmall>
            Questrade is offering free subscriptions for one year, with no
            commitment on your part. We don't even need your credit card!
          </PSmall>
          <PSmall>
            After upgrading, you'll be able to place all your trades through
            Passiv in a single click. You can access{' '}
            <ASmall href="/pricing" target="_blank" rel="noopener noreferrer">
              all features
            </ASmall>{' '}
            just by accepting this offer.
          </PSmall>
          <Button onClick={() => push('/app/questrade-offer')}>
            Upgrade Now
          </Button>
        </DetailRow>
      </IdeaBox>
    );
  }
  if (error) {
    orderValidation = error;
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
                market orders on your <Link to="/app/settings">settings</Link>{' '}
                page.
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
              <P>
                You can switch over to limit orders on your{' '}
                <Link to="/app/settings">settings</Link> page.
              </P>
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
