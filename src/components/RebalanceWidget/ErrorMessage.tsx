import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import {
  OrderContainer,
  ConfirmContainer,
  ErrorDetail,
  ErrorAttributeSpan,
} from './styles';
import { P, H2 } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import ConnectionUpdate from '../ConnectionUpdate';
import { loadGroupAndAccounts } from '../../actions';
import { selectDashboardGroups } from '../../selectors/groups';
import { push } from 'connected-react-router';

type Props = {
  error: any;
  closeWidget: () => void;
  groupId: string;
};

const ErrorMessage = ({ error, closeWidget, groupId }: Props) => {
  const groups = useSelector(selectDashboardGroups);
  const dispatch = useDispatch();

  const reloadGroup = () => {
    dispatch(loadGroupAndAccounts({ ids: [groupId] }));
  };

  const getReadBrokerageAuthorization = () => {
    let group = groups.find(g => g.id === groupId);
    if (!group || !group.brokerage_authorizations) {
      return;
    }
    return group.brokerage_authorizations.find(a => a.type === 'read');
  };
  switch (error.code) {
    case '1014':
      return (
        <OrderContainer>
          <H2>Passiv needs trading permissions to place orders</H2>
          <P>
            This portfolio group does not have trade permissions and therefore
            can't be used to place orders.
          </P>
          <P>
            Reconnect with full trade permissions to place orders with Passiv:
          </P>
          <ConfirmContainer>
            <ConnectionUpdate
              authorization={getReadBrokerageAuthorization()}
              type="trade"
              hideTitle={true}
              name="Reconnect"
              align="left"
            />
          </ConfirmContainer>
        </OrderContainer>
      );
    case '1019':
      return (
        <OrderContainer>
          <H2>
            <FontAwesomeIcon icon={faClock} /> Markets are Closed
          </H2>
          <P>{error.detail}</P>
          <ErrorDetail>
            <ErrorAttributeSpan>Exchange:</ErrorAttributeSpan>
            <span>
              {error.meta.exchange.code} ({error.meta.exchange.name})
            </span>
          </ErrorDetail>
          <ErrorDetail>
            <ErrorAttributeSpan>Reason:</ErrorAttributeSpan>
            <span>{error.meta.reason}</span>
          </ErrorDetail>
          <ConfirmContainer>
            <Button onClick={closeWidget}>Okay</Button>
          </ConfirmContainer>
        </OrderContainer>
      );
    case '1020':
      return (
        <OrderContainer>
          <H2>Upgrade to access one-click trades</H2>
          <P>
            One-click Trades are only available to Elite subscribers. You can
            upgrade your account to use this feature.{' '}
            <Link to="/app/help">Contact support</Link> if you're already a paid
            subscriber and you're still receiving this message.
          </P>
          <Button onClick={() => dispatch(push('/app/settings'))}>
            Upgrade
          </Button>
        </OrderContainer>
      );
    case '1022':
      return (
        <OrderContainer>
          <H2>Order has already been placed, can't place again</H2>
          <P>
            Our records show that this order has already been placed, so Passiv
            will not attempt to place it again. Please refresh the orders or{' '}
            <Link to="/app/help">contact support</Link> if this persists.
          </P>
          <Button onClick={reloadGroup}>Refresh</Button>
        </OrderContainer>
      );
    case '1033':
      return (
        <OrderContainer>
          <H2>Order type unsupported on one or more exchanges</H2>
          <P>
            We are unable to place your orders because some trades are on
            exchanges that only accept limit orders. Passiv uses market orders
            by default.
          </P>
          <P>
            Consider using limit orders by enabling them on your{' '}
            <Link to="/app/settings">settings</Link> page. Alternatively, you
            can always place orders manually on your brokerage.
          </P>
          <Button onClick={closeWidget}>Okay</Button>
        </OrderContainer>
      );
    case '1042':
      return (
        <OrderContainer>
          <H2>Trading functionality is temporarily disabled</H2>
          <P>
            We're sorry, we can't place your order at the moment. Trading
            functionality has been temporarily disabled while we address an
            issue with international holiday handling. If you need to place
            orders immediately, you can still do so at your brokerage.
          </P>
          <P>Thanks for your patience!</P>
          <Button onClick={closeWidget}>Okay</Button>
        </OrderContainer>
      );
    case '1047':
      return (
        <OrderContainer>
          <H2>Can't place orders due to existing open orders</H2>
          <P>
            It looks like you have some open orders on one or more of your
            brokerage accounts. Open orders can cause unexpected behavior while
            Passiv attempts to place a batch of orders, so we didn't try to
            place the orders on your account.
          </P>
          <P>
            You can fix this by logging into your brokerage account and closing
            any open orders that you may have. If that's not the case, please{' '}
            <Link to="/app/help">contact support</Link> and let us know!
          </P>
          <Button onClick={closeWidget}>Okay</Button>
        </OrderContainer>
      );
    case '1048':
      return (
        <OrderContainer>
          <H2>Canceled due to possible negative cash balance</H2>
          <P>Your account's net cash</P>
          <P>
            You can fix this by logging into your brokerage account and closing
            any open orders that you may have. If that's not the case, please{' '}
            <Link to="/app/help">contact support</Link> and let us know!
          </P>
          <Button onClick={closeWidget}>Okay</Button>
        </OrderContainer>
      );
    case '0000':
      return (
        <OrderContainer>
          <H2>Order cannot be Processed</H2>
          <P>
            Oops, you've encountered a bug! Please try again later or{' '}
            <Link to="/app/help">contact support</Link> if this persists.
          </P>
          <ConfirmContainer>
            <Button onClick={closeWidget}>Okay</Button>
          </ConfirmContainer>
        </OrderContainer>
      );
    default:
      return (
        <OrderContainer>
          <H2>Order cannot be Processed</H2>
          <P>
            Oops, you've encountered a bug! Please try again later or{' '}
            <Link to="/app/help">contact support</Link> if this persists.
          </P>
        </OrderContainer>
      );
  }
};

export default ErrorMessage;
