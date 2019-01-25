import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrentGroupId, selectAccounts, selectCurrencies } from '../selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { baseUrl, loadGroup } from '../actions';
import { getData, postData } from '../api';
import { Button } from '../styled/Button';
import styled from '@emotion/styled';


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
                <h1>Order Summary</h1>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <td>
                          Account
                        </td>
                        <td>
                          Currency
                        </td>
                        <td>
                          Remaining Cash
                        </td>
                        <td>
                          Estimated Commissions
                        </td>
                        <td>
                          Forex Fees
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.orderSummary.map((order) => (
                        <tr key={[order.account, order.currency].join(':')}>
                          <td>
                            {this.props.accounts.find(a => a.id === order.account).name}
                          </td>
                          <td>
                            {this.props.currencies.find(c => c.id === order.currency).code}
                          </td>
                          <td>
                            {order.remaining_cash}
                          </td>
                          <td>
                            {order.estimated_commissions}
                          </td>
                          <td>
                            {order.forex_fees}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                  {
                    this.state.placingOrders ? (
                      <div>
                        <p>Placing orders ... <FontAwesomeIcon icon={faSpinner} spin /></p>
                      </div>
                      ) : (
                        <div>
                          <Button onClick={() => {this.confirmOrders()}}>
                            Confirm
                          </Button>
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
      <AllocateBtn>
        <button onClick={() => this.toggleExpand()}>{this.anySells() ? 'Rebalance' : 'Allocate'} {this.state.expanded ? ( <FontAwesomeIcon icon={faChevronUp} /> ) : ( <FontAwesomeIcon icon={faChevronDown} /> )}</button>
        { orderValidation }
      </AllocateBtn>
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
