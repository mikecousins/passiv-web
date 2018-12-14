import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrentGroupId } from '../selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { baseUrl } from '../actions';
import { getData } from '../api';

class RebalanceWidget extends Component {
  state = {
    expanded: false,
    validatingOrders: false,
  }

  anySells() {
    let sellsFound = false;
    this.props.trades.trades.map(trade => {
      if (trade.action === 'SELL') {
        sellsFound = true;
      }
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
        this.setState({validatingOrders: true});
      })
      .catch(error => {
        console.log('error', error);
        this.setState({validatingOrders: false});
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
          <p>Orders validated!</p>
        )
      }
    }

    return (
      <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
        <button onClick={() => this.toggleExpand()}>{this.anySells() ? 'Rebalance' : 'Allocate'} {this.state.expanded ? ( <FontAwesomeIcon icon={faChevronUp} /> ) : ( <FontAwesomeIcon icon={faChevronDown} /> )}</button>
        { orderValidation }
      </div>
    )
  }
};

const select = state => ({
  groupId: selectCurrentGroupId(state),
});
const actions = {
};

export default connect(select, actions)(RebalanceWidget);
