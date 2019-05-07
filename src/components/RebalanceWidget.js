import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faClock } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import styled from '@emotion/styled';
import { loadGroup } from '../actions';
import { getData, postData } from '../api';
import {
  selectBrokerages,
  selectUserPermissions,
  selectCurrencyRates,
  selectCurrencies,
} from '../selectors';
import { selectSymbols } from '../selectors/symbols';
import {
  selectDashboardGroups,
  selectPreferredCurrency,
} from '../selectors/groups';
import { Button } from '../styled/Button';
import { H2, P, A, Title } from '../styled/GlobalElements';
import ConnectionUpdate from '../components/ConnectionUpdate';
import {
  TradeRow,
  Symbol,
  ColumnSymbolSmall,
  ColumnUnits,
  ColumnAction,
  ColumnStatus,
} from '../styled/Group';

import OrderImpacts from './OrderImpacts';

const SummaryContainer = styled.div`
  text-align: left;
  margin-top: 25px;
  button {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    border-radius: 2px;
  }
`;

const OrderContainer = styled.div`
  position: relative;
  border-radius: 4px;
  padding: 25px;
  margin-top: 30px;
  background: #f5f9ff;
  color: var(--brand-grey);
  h2 {
    margin-bottom: 20px;
  }
`;

const ConfirmContainer = styled.div`
  text-align: left;
  a {
    margin-left: 20px;
    font-weight: 700;
    text-decoration: underline;
  }
`;

const UpgradeText = styled.span`
  font-weight: 600;
  color: #2a2e33;
  font-size: 22px;
  button {
    margin-left: 20px;
  }
`;

const ModifiedTradeRow = styled(TradeRow)`
  margin-bottom: 10px;
`;

export class RebalanceWidget extends Component {
  state = this.initialState();

  initialState() {
    return {
      validatingOrders: false,
      placingOrders: false,
      orderSummary: null,
      orderResults: null,
      error: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.initialState());
  }

  validateOrders = () => {
    this.setState({ validatingOrders: true });
    getData(
      `/api/v1/portfolioGroups/${this.props.groupId}/calculatedtrades/${
        this.props.trades.id
      }/impact`,
    )
      .then(response => {
        this.setState({
          validatingOrders: false,
          orderSummary: response.data,
          error: null,
        });
      })
      .catch(error => {
        this.setState({
          validatingOrders: false,
          orderSummary: null,
          error: error.response.data,
        });
      });
  };

  confirmOrders = () => {
    this.setState({ placingOrders: true });
    postData(
      `/api/v1/portfolioGroups/${this.props.groupId}/calculatedtrades/${
        this.props.trades.id
      }/placeOrders`,
    )
      .then(response => {
        this.setState({
          placingOrders: false,
          orderResults: response.data,
          error: null,
        });
      })
      .catch(error => {
        this.setState({
          placingOrders: false,
          orderResults: null,
          error: error.response.data,
        });
      });
  };

  cancelOrders = () => {
    this.setState({
      placingOrders: false,
      validatingOrders: false,
      orderSummary: null,
      orderResults: null,
      error: null,
    });
  };

  closeWidget = () => {
    this.setState({
      placingOrders: false,
      validatingOrders: false,
      orderSummary: null,
      orderResults: null,
      error: null,
    });
    // reload group data following a successful order
    this.props.reloadGroup({ ids: [this.props.groupId] });
  };

  reloadGroup = () => {
    this.props.reloadGroup({ ids: [this.props.groupId] });
  };

  componentWillUnmount = () => {
    if (this.state.orderResults || this.state.error) {
      this.reloadGroup();
    }
  };

  preferredCurrencyCode = () => {
    const preferredCurrency = this.props.currencies.find(
      currency => currency.id === this.props.preferredCurrency,
    );
    return preferredCurrency.code;
  };

  convertCurrency = (src, amount) => {
    const preferredCurrency = this.props.currencies.find(
      currency => currency.code === 'CAD',
    ).id;

    if (src === preferredCurrency) {
      return amount;
    } else {
      const rate = this.props.rates.find(
        rate => rate.src.id === src && rate.dst.id === preferredCurrency,
      );
      return amount * rate.exchange_rate;
    }
  };

  sumForexFees = () => {
    return this.state.orderSummary.reduce((acc, result) => {
      return acc + this.convertCurrency(result.currency, result.forex_fees);
    }, 0);
  };

  sumEstimatedCommissions = () => {
    return this.state.orderSummary.reduce((acc, result) => {
      return (
        acc +
        this.convertCurrency(result.currency, result.estimated_commissions)
      );
    }, 0);
  };

  sumRemainingCash = () => {
    return this.state.orderSummary.reduce((acc, result) => {
      return acc + this.convertCurrency(result.currency, result.remaining_cash);
    }, 0);
  };

  getReadBrokerageAuthorization = () => {
    let group = this.props.groups.find(g => g.id === this.props.groupId);
    return group.brokerage_authorizations.find(a => a.type === 'read');
  };

  canPlaceOrders = () => {
    let permissions = this.props.userPermissions;
    if (!permissions) {
      return false;
    }
    let filtered_permissions = permissions.filter(
      permission => permission === 'can_place_orders',
    );

    if (filtered_permissions.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { push } = this.props;
    let error = null;
    if (this.state.error) {
      switch (this.state.error.code) {
        case '1014':
          error = (
            <OrderContainer>
              <H2>Order cannot be Processed</H2>
              <P>
                This portfolio group does not have trade permissions and
                therefore can't be used to place orders.
              </P>
              <P>
                Reconnect with full trade permissions to place orders with
                Passiv:
              </P>
              <ConfirmContainer>
                <ConnectionUpdate
                  authorization={this.getReadBrokerageAuthorization()}
                  type="trade"
                  hideTitle={true}
                  name="Reconnect"
                  align="left"
                />
              </ConfirmContainer>
            </OrderContainer>
          );
          break;
        case '1019':
          error = (
            <OrderContainer>
              <H2>
                <FontAwesomeIcon icon={faClock} /> Markets are Closed
              </H2>
              <P>
                Passiv is unable to proceed with the orders because markets are
                currently closed. Note that you may see this message up to 10
                minutes after markets open at the beginning of a trading day as
                a precaution against price volatility. Please{' '}
                <Link to="/app/help">contact support</Link> if this message
                persists while markets are open.
              </P>
              <ConfirmContainer>
                <Button
                  onClick={() => {
                    this.closeWidget();
                  }}
                >
                  Okay
                </Button>
              </ConfirmContainer>
            </OrderContainer>
          );
          break;
        case '1020':
          error = (
            <OrderContainer>
              <H2>Order cannot be Processed</H2>
              <P>
                One-click Trades are only available to Elite subscribers. You
                can upgrade your account to use this feature.{' '}
                <Link to="/app/help">Contact support</Link> if you're already a
                paid subscriber and you're still receiving this message.
              </P>
              <Button onClick={() => push('/app/settings')}>Upgrade</Button>
            </OrderContainer>
          );
          break;
        case '1022':
          error = (
            <OrderContainer>
              <H2>Order cannot be Processed</H2>
              <P>
                Our records show that this order has already been placed, so
                Passiv will not attempt to place it again. Please refresh the
                orders or <Link to="/app/help">contact support</Link> if this
                persists.
              </P>
              <Button onClick={() => this.reloadGroup()}>Refresh</Button>
            </OrderContainer>
          );
          break;
        case '0000':
          error = (
            <OrderContainer>
              <H2>Order cannot be Processed</H2>
              <P>
                Oops, you've encountered a bug! Please try again later or{' '}
                <Link to="/app/help">contact support</Link> if this persists.
              </P>
              <ConfirmContainer>
                <Button
                  onClick={() => {
                    this.closeWidget();
                  }}
                >
                  Okay
                </Button>
              </ConfirmContainer>
            </OrderContainer>
          );
          break;
        default:
          error = (
            <OrderContainer>
              <H2>Order cannot be Processed</H2>
              <P>
                Oops, you've encountered a bug! Please try again later or{' '}
                <Link to="/app/help">contact support</Link> if this persists.
              </P>
            </OrderContainer>
          );
          break;
      }
    }

    let orderValidation = (
      <Button onClick={this.validateOrders}>Validate</Button>
    );
    if (!this.canPlaceOrders()) {
      orderValidation = (
        <UpgradeText>
          Upgrade your account to let us execute trades for you!{' '}
          <Button onClick={() => push('/app/settings')}>Upgrade</Button>
        </UpgradeText>
      );
    } else if (this.state.error) {
      orderValidation = error;
    } else {
      if (this.state.validatingOrders) {
        orderValidation = (
          <OrderContainer>
            <P>
              Validating orders ...&nbsp;
              <FontAwesomeIcon icon={faSpinner} spin />
            </P>
          </OrderContainer>
        );
      } else if (this.state.orderSummary) {
        orderValidation = this.state.orderResults ? (
          <OrderContainer>
            <H2>Order Results</H2>
            <div>
              {this.state.orderResults.map(results => {
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
                <Button
                  onClick={() => {
                    this.closeWidget();
                  }}
                >
                  Okay!
                </Button>
              </ConfirmContainer>
            </div>
          </OrderContainer>
        ) : this.state.orderSummary ? (
          <OrderContainer>
            <H2>Order Summary</H2>
            <P>
              The trades listed above will be placed as market orders on
              Questrade.
            </P>
            <div>
              <OrderImpacts impacts={this.state.orderSummary} />
            </div>
            <P>
              Market orders may result in the price paid or received to be
              different from the last price quoted before the order was placed.{' '}
              <A
                href="https://questrade-support.secure.force.com/mylearning/view/h/Investing/Market+orders"
                target="_blank"
              >
                Learn more
              </A>
            </P>
            <P>
              <A
                href="https://www.questrade.com/pricing/self-directed-investing/fees#exchange-ecn-fees"
                target="_blank"
              >
                Exchange and ECN fees
              </A>
              ,{' '}
              <A
                href="https://www.questrade.com/pricing/self-directed-investing/fees#exchange-ecn-fees"
                target="_blank"
              >
                SEC fees
              </A>{' '}
              and for ADRs{' '}
              <A
                href="https://www.questrade.com/pricing/self-directed-investing/fees#exchange-ecn-fees"
                target="_blank"
              >
                annual custody
              </A>{' '}
              fees may apply. Commissions may vary if your order is filled over
              multiple days. Borrow fees may apply if you hold a short
              investment overnight.
            </P>
            {this.state.placingOrders ? (
              <div>
                <p>
                  Placing orders ... <FontAwesomeIcon icon={faSpinner} spin />
                </p>
              </div>
            ) : (
              <div>
                <ConfirmContainer>
                  <Button
                    onClick={() => {
                      this.confirmOrders();
                    }}
                  >
                    Confirm
                  </Button>
                  <A
                    onClick={() => {
                      this.cancelOrders();
                    }}
                  >
                    Cancel
                  </A>
                </ConfirmContainer>
              </div>
            )}
          </OrderContainer>
        ) : (
          <div>
            <P>There is a problem with your orders: {this.state.error}</P>
          </div>
        );
      }
    }

    return <SummaryContainer>{orderValidation}</SummaryContainer>;
  }
}

const actions = {
  reloadGroup: loadGroup,
  push: push,
};

const select = state => ({
  symbols: selectSymbols(state),
  brokerages: selectBrokerages(state),
  groups: selectDashboardGroups(state),
  userPermissions: selectUserPermissions(state),
  rates: selectCurrencyRates(state),
  currencies: selectCurrencies(state),
  preferredCurrency: selectPreferredCurrency(state),
});

export default connect(
  select,
  actions,
)(RebalanceWidget);
