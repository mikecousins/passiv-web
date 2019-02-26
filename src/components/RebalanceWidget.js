import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { loadGroup } from '../actions';
import { getData, postData } from '../api';
import { selectSymbols } from '../selectors';
import { Button } from '../styled/Button';
import styled from '@emotion/styled';
import { H2, P, A, Table } from '../styled/GlobalElements';
import Number from './Number';

const SummaryContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  color: #000;
  border-radius: 4px;
  > div {
    background: #ffffff;
    text-align: left;
  }
`;

const ConfirmContainer = styled.div`
  text-align: right;
`;

const MetaHorizontal = styled.div`
  text-align: left;
  span {
    font-weight: 600;
    margin-bottom: 8px;
    display: inline-block;
    margin-right: 6px;
    text-align: left;
  }
`;

export class RebalanceWidget extends Component {
  state = {
    validatingOrders: false,
    placingOrders: false,
    orderSummary: null,
    orderResults: null,
    error: null,
  }

  validateOrders = () => {
    this.setState({ validatingOrders: true });
    getData(`/api/v1/portfolioGroups/${this.props.groupId}/calculatedtrades/${this.props.trades.id}/impact`)
      .then(response => {
        this.setState({ validatingOrders: false, orderSummary: response.data, error: null });
      })
      .catch(error => {
        this.setState({ validatingOrders: false, orderSummary: null, error: error.response.data });
      });
  }

  confirmOrders = () => {
    this.setState({ placingOrders: true });
    postData(`/api/v1/portfolioGroups/${this.props.groupId}/calculatedtrades/${this.props.trades.id}/placeOrders`)
      .then(response => {
        this.setState({ placingOrders: false, orderResults: response.data, error: null });

        // reload group data following a successful order
        // this.props.reloadGroup({ ids: [this.props.groupId] });
      })
      .catch(error => {
        this.setState({ placingOrders: false, orderResults: null, error: error.response.data });
      });
  }

  cancelOrders = () => {
    this.setState({
      placingOrders: false,
      validatingOrders: false,
      orderSummary: null,
      orderResults: null,
      error: null,
    });
  }

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
  }

  sumEstimatedCommissions = () => {
    return this.state.orderSummary.reduce((acc, result) => {return acc + result.estimated_commissions}, 0);
  }

  sumRemainingCash = () => {
    return this.state.orderSummary.reduce((acc, result) => {return acc + result.remaining_cash}, 0);
  }

  render() {
    let orderValidation = (
      <Button onClick={this.validateOrders}>
        Validate
      </Button>
    );
    if (this.state.validatingOrders) {
      orderValidation = (
        <div>
        <P>
          Validating orders ...&nbsp;
          <FontAwesomeIcon icon={faSpinner} spin />
        </P>
        </div>
      );
    } else if (this.state.orderSummary || this.state.error) {
      orderValidation = (
        this.state.orderResults ? (
          <div>
            <H2>Order Results</H2>
            <div>
              <Table>
                <div>Action</div>
                <div>Symbol</div>
                <div>Units</div>
                <div>Status</div>
              </Table>
              {
                this.state.orderResults.map(results => {
                  return (
                    <Table key={results.trade}>
                      <div>{ results.action }</div>
                      <div>{ results.universal_symbol.symbol }</div>
                      <div>{ results.filled_units }</div>
                      <div>{ results.state }</div>
                    </Table>
                  )
                })
              }
            </div>
            <div>
              <ConfirmContainer>
                <Button onClick={() => {this.closeWidget()}}>
                  Okay!
                </Button>
              </ConfirmContainer>
            </div>
          </div>
        ) : (
          this.state.orderSummary ? (
            <div>
              <H2>Order Summary</H2>
              <P>
                The trades listed above will be placed as market orders on Questrade.
              </P>
              <div>
                <MetaHorizontal>
                  <span>Estimated commissions:</span> <Number value={this.sumEstimatedCommissions()} currency />
                </MetaHorizontal>
                <MetaHorizontal>
                  <span>Remaining cash:</span> <Number value={this.sumRemainingCash()} currency />
                </MetaHorizontal>
              </div>
              <P>
                Market orders may result in the price paid or received to be different from the last price quoted before the order was placed. <A href="https://questrade-support.secure.force.com/mylearning/view/h/Investing/Market+orders" target="_blank">Learn more</A>
              </P>
              <P>
                <A href="https://www.questrade.com/pricing/self-directed-investing/fees#exchange-ecn-fees" target="_blank">Exchange and ECN fees</A>, <A href="https://www.questrade.com/pricing/self-directed-investing/fees#exchange-ecn-fees" target="_blank">SEC fees</A> and for ADRs <A href="https://www.questrade.com/pricing/self-directed-investing/fees#exchange-ecn-fees" target="_blank">annual custody</A> fees may apply. Commissions may vary if your order is filled over multiple days. Borrow fees may apply if you hold a short investment overnight.
              </P>
                {this.state.placingOrders ? (
                  <div>
                    <p>Placing orders ... <FontAwesomeIcon icon={faSpinner} spin /></p>
                  </div>
                ) : (
                  <div>
                    <ConfirmContainer>
                      <Button onClick={() => {this.cancelOrders()}}>
                        Cancel
                      </Button>
                      <Button onClick={() => {this.confirmOrders()}}>
                        Confirm
                      </Button>
                    </ConfirmContainer>
                  </div>
                )}
            </div>
          ) : (
            <div>
              <P>
                There is a problem with your orders: {this.state.error}
              </P>
            </div>
          )
        )
      );
    }

    return (
      <SummaryContainer>
        {orderValidation}
      </SummaryContainer>

    )
  }
};

const actions = {
  reloadGroup: loadGroup,
};

const select = state => ({
  symbols: selectSymbols(state),
});

export default connect(select, actions)(RebalanceWidget);
