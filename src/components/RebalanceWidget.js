import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrentGroupId, selectAccounts, selectCurrencies } from '../selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { baseUrl, loadGroup } from '../actions';
import { getData, postData } from '../api';
import { Button } from '../styled/Button';
import styled from '@emotion/styled';
import { H2, P, A } from '../styled/GlobalElements';
import Number from './Number';


export const AllocateBtn= styled.div`
  button {
    position: absolute;
    top: 100%;
    margin-top: -20px;
    left: 0;
    font-size: 16px;
    padding: 8px 24px;
    border-radius: 4px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.37);
    background-color: #003ba2;
    color: #fff;
  }
`;

export const SummaryContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  color: #000;
  border-radius: 4px;
  > div {
    background: #ffffff;
    text-align: left;
  }
`;

export const ConfirmContainer = styled.div`
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


class RebalanceWidget extends Component {
  state = {
    expanded: false,
    validatingOrders: false,
    placingOrders: false,
    orderSummary: null,
    orderResults: null,
    error: null,
  }

  anySells() {
    let sellsFound = false;
    this.props.trades.trades.map(trade => {
      if (trade.action === 'SELL') {
        sellsFound = true;
      }
      return null;
    })
    return sellsFound;
  }

  toggleExpand() {
    if (this.state.expanded === true) {
      this.setState({expanded: false, validatingOrders: false,});
    }
    else if (this.state.expanded === false) {
      this.setState({expanded: true});
      this.validateOrders();
    }
  }

  validateOrders() {
    this.setState({validatingOrders: true});
    getData(`${baseUrl}/api/v1/portfolioGroups/${this.props.groupId}/calculatedtrades/${this.props.trades.id}/impact`)
      .then(response => {
        console.log('success', response);
        this.setState({validatingOrders: false, orderSummary: response, error: null});
      })
      .catch(error => {
        console.log('error', error);
        this.setState({validatingOrders: false, orderSummary: null, error: error});
      });
  }

  confirmOrders() {
    this.setState({placingOrders: true});
    postData(`${baseUrl}/api/v1/portfolioGroups/${this.props.groupId}/calculatedtrades/${this.props.trades.id}/placeOrders`)
      .then(response => {
        console.log('success', response);
        this.setState({placingOrders: false, orderResults: response, error: null});

        // reload group data following a successful order
        this.props.reloadGroup({ids: [this.props.groupId]});
      })
      .catch(error => {
        console.log('error', error);
        this.setState({placingOrders: false, orderResults: null, error: error});
      });
  }

  buttonName() {
    if (this.anySells() === true) {
      return 'Rebalance';
    }
    else {
      return 'Allocate';
    }
  }

  sumEstimatedCommissions() {
    return this.state.orderSummary.reduce((acc, result) => {return acc + result.estimated_commissions}, 0);
  }

  sumRemainingCash() {
    // console.log(this.state.orderSummary)
    return this.state.orderSummary.reduce((acc, result) => {return acc + result.remaining_cash}, 0);
  }

  render() {
    let orderValidation = null;
    if (this.state.expanded) {
      if (this.state.validatingOrders) {
        orderValidation = (
          <p>Validating orders ... <FontAwesomeIcon icon={faSpinner} spin /></p>
        )
      }
      else {
        orderValidation = (
          this.state.orderSummary ? (
              <div>
                <H2>Order Summary</H2>
                <div>
                  <MetaHorizontal>
                    <span>Estimated commissions:</span> <Number value={this.sumEstimatedCommissions()} currency />
                  </MetaHorizontal>
                  <MetaHorizontal>
                    <span>Remaining cash:</span> <Number value={this.sumRemainingCash()} currency />
                  </MetaHorizontal>
                </div>
                <P>
                  <A href="https://www.questrade.com/pricing/self-directed-investing/fees#exchange-ecn-fees" target="_blank">Exchange and ECN fees</A>, <A href="https://www.questrade.com/pricing/self-directed-investing/fees#exchange-ecn-fees" target="_blank">SEC fees</A> and for ADRs <A href="https://www.questrade.com/pricing/self-directed-investing/fees#exchange-ecn-fees" target="_blank">annual custody</A> fees may apply. Commissions may vary if your order is filled over multiple days. Borrow fees may apply if you hold a short investment overnight.
                </P>

                  {
                    this.state.placingOrders ? (
                      <div>
                        <p>Placing orders ... <FontAwesomeIcon icon={faSpinner} spin /></p>
                      </div>
                      ) : (
                        <div>
                          <ConfirmContainer>
                            <Button onClick={() => {this.confirmOrders()}}>
                              Confirm
                            </Button>
                          </ConfirmContainer>

                        </div>
                      )
                  }


              </div>
            ) : (
              <div>
                <div>
                  There is a problem with your orders: {this.state.error}
                </div>
              </div>
            )

        )
      }
    }

    return (
      <SummaryContainer>
        { orderValidation }
        <AllocateBtn>
          <button onClick={() => this.toggleExpand()}>{this.anySells() ? 'Rebalance' : 'Allocate'} {this.state.expanded ? ( <FontAwesomeIcon icon={faChevronUp} /> ) : ( <FontAwesomeIcon icon={faChevronDown} /> )}</button>
        </AllocateBtn>
      </SummaryContainer>

    )
  }
};

const select = state => ({
  groupId: selectCurrentGroupId(state),
  accounts: selectAccounts(state),
  currencies: selectCurrencies(state),
});
const actions = {
  reloadGroup: loadGroup,
};

export default connect(select, actions)(RebalanceWidget);
