import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faClock,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import styled from '@emotion/styled';
import { loadGroupAndAccounts } from '../../actions';
import { getData, postData } from '../../api';
import {
  selectBrokerages,
  selectCurrencyRates,
  selectCurrencies,
  selectSettings,
  selectLimitOrdersFeature,
} from '../../selectors';
import { selectSymbols } from '../../selectors/symbols';
import {
  selectDashboardGroups,
  selectPreferredCurrency,
} from '../../selectors/groups';
import {
  selectCanPlaceOrders,
  selectShowQuestradeOffer,
} from '../../selectors/subscription';
import { Button } from '../../styled/Button';
import { H2, P, A, Title } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import ConnectionUpdate from '../ConnectionUpdate';
import {
  TradeRow,
  Symbol,
  ColumnSymbolSmall,
  ColumnUnits,
  ColumnAction,
  ColumnStatus,
} from '../../styled/Group';

import OrderImpacts from './OrderImpacts';

const SummaryContainer = styled.div`
  text-align: left;
  margin-top: 25px;
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

const ModifiedTradeRow = styled(TradeRow)`
  margin-bottom: 10px;
`;

const IdeaBox = styled(ShadowBox)`
  color: var(--brand-grey);
  width: 100%;
`;

const IdeaRow = styled.div`
  display: flex;
`;

const DetailRow = styled.div`
  padding-top: 20px;
`;

const IconBox = styled.div`
  font-size: 4em;
`;

const CopyBox = styled.div`
  padding-top: 18px;
  padding-left: 30px;
`;

const PSmall = styled(P)`
  font-size: 16px;
`;

const ASmall = styled(A)`
  font-size: 16px;
`;

const ErrorDetail = styled(P)`
  padding-left: 20px;
`;

const ErrorAttributeSpan = styled.span`
  font-weight: 600;
  padding-right: 10px;
`;

export class RebalanceWidget extends Component {
  state = {
    validatingOrders: false,
    placingOrders: false,
    orderSummary: null,
    orderResults: null,
    error: null,
  };

  reloadData = () => {
    // reload the group
    this.reloadGroup();
  };

  validateOrders = () => {
    this.setState({ validatingOrders: true });
    getData(
      `/api/v1/portfolioGroups/${this.props.groupId}/calculatedtrades/${this.props.trades.id}/impact`,
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
      `/api/v1/portfolioGroups/${this.props.groupId}/calculatedtrades/${this.props.trades.id}/placeOrders`,
    )
      .then(response => {
        this.setState({
          placingOrders: false,
          orderResults: response.data,
          error: null,
        });
        this.reloadData();
      })
      .catch(error => {
        this.setState({
          placingOrders: false,
          orderResults: null,
          error: error.response.data,
        });
        this.reloadData();
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

    // execute callback
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  reloadGroup = () => {
    this.props.reloadGroup({ ids: [this.props.groupId] });
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

  render() {
    const { push, showQuestradeOffer } = this.props;
    let error = null;
    console.log(this.props.settings);
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
              <P>{this.state.error.detail}</P>
              <ErrorDetail>
                <ErrorAttributeSpan>Exchange:</ErrorAttributeSpan>
                <span>
                  {this.state.error.meta.exchange.code} (
                  {this.state.error.meta.exchange.name})
                </span>
              </ErrorDetail>
              <ErrorDetail>
                <ErrorAttributeSpan>Reason:</ErrorAttributeSpan>
                <span>{this.state.error.meta.reason}</span>
              </ErrorDetail>
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
        case '1033':
          error = (
            <OrderContainer>
              <H2>Order cannot be Processed</H2>
              <P>
                We are unable to place your orders because some trades are on
                exchanges that only accept limit orders. Passiv uses market
                orders by default.
              </P>
              <P>
                Consider using limit orders by enabling them on your{' '}
                <Link to="/app/settings">settings</Link> page. Alternatively,
                you can always place orders manually on your brokerage.
              </P>
              <Button onClick={() => this.closeWidget()}>Okay</Button>
            </OrderContainer>
          );
          break;
        case '1042':
          error = (
            <OrderContainer>
              <H2>Order cannot be Processed</H2>
              <P>
                We're sorry, we can't place your order at the moment. Trading
                functionality has been temporarily disabled while we address an
                issue with international holiday handling. If you need to place
                orders immediately, you can still do so at your brokerage.
              </P>
              <P>Thanks for your patience!</P>
              <Button onClick={() => this.closeWidget()}>Okay</Button>
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
      <Button onClick={this.validateOrders}>Prepare Orders</Button>
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
    if (this.state.error) {
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
            {this.props.settings.trade_with_limit_orders ? (
              <React.Fragment>
                <P>
                  The trades listed above will be placed as limit orders on your
                  brokerage account, with a{' '}
                  {this.props.settings.price_limit_threshold}% price limit
                  threshold.
                </P>
                <div>
                  <OrderImpacts impacts={this.state.orderSummary} />
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
                  The trades listed above will be placed as market orders on
                  your brokerage account.
                </P>
                <div>
                  <OrderImpacts impacts={this.state.orderSummary} />
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
                {this.props.limitOrdersEnabled && (
                  <P>
                    You can switch to using limit orders on your{' '}
                    <Link to="/app/settings">settings</Link> page.
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
              annual custody fees may apply. Commissions may vary if your order
              is filled over multiple days. Borrow fees may apply if you hold a
              short investment overnight.
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
  reloadGroup: loadGroupAndAccounts,
  push: push,
};

const select = state => ({
  symbols: selectSymbols(state),
  brokerages: selectBrokerages(state),
  groups: selectDashboardGroups(state),
  canPlaceOrders: selectCanPlaceOrders(state),
  rates: selectCurrencyRates(state),
  currencies: selectCurrencies(state),
  preferredCurrency: selectPreferredCurrency(state),
  showQuestradeOffer: selectShowQuestradeOffer(state),
  settings: selectSettings(state),
  limitOrdersEnabled: selectLimitOrdersFeature(state),
});

export default connect(select, actions)(RebalanceWidget);
