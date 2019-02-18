import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { baseUrl, loadGroup } from '../actions';
import { getData, postData } from '../api';
import { Button } from '../styled/Button';
import styled from '@emotion/styled';
import { H2, P, A } from '../styled/GlobalElements';
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
    getData(`${baseUrl}/api/v1/portfolioGroups/${this.props.groupId}/calculatedtrades/${this.props.trades.id}/impact`)
      .then(response => {
        this.setState({ validatingOrders: false, orderSummary: response, error: null });
      })
      .catch(error => {
        this.setState({ validatingOrders: false, orderSummary: null, error: error });
      });
  }

  confirmOrders = () => {
    this.setState({ placingOrders: true });
    postData(`${baseUrl}/api/v1/portfolioGroups/${this.props.groupId}/calculatedtrades/${this.props.trades.id}/placeOrders`)
      .then(response => {
        this.setState({ placingOrders: false, orderResults: response, error: null });

        // reload group data following a successful order
        this.props.reloadGroup({ ids: [this.props.groupId] });
      })
      .catch(error => {
        this.setState({ placingOrders: false, orderResults: null, error: error });
      });
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
        <p>
          Validating orders ...&nbsp;
          <FontAwesomeIcon icon={faSpinner} spin />
        </p>
      );
    } else if (this.state.orderSummary || this.state.error) {
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
              {this.state.placingOrders ? (
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
              )}
          </div>
        ) : (
          <div>
            <div>
              There is a problem with your orders: {this.state.error}
            </div>
          </div>
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

export default connect(null, actions)(RebalanceWidget);
