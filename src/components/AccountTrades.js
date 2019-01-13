import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrentGroupTrades } from '../selectors';
import RebalanceWidget from './RebalanceWidget';

import ShadowBox from '../styled/ShadowBox';

class AccountTrades extends Component {
  render() {
    let trades = null;
    if (this.props.trades && this.props.trades.trades.length > 0) {
      trades = this.props.trades.trades.map(trade => (
        <div key={trade.id}>
          <div>
            <h3>{trade.action}</h3>
          </div>
          <div>
            <div>{trade.universal_symbol.description}</div>
            <div>{trade.universal_symbol.symbol}</div>
          </div>
          <div>
            <div>Units</div>
            <div>{trade.units}</div>
          </div>
          <div>
            <div>Price</div>
            <div>{trade.price}</div>
          </div>
        </div>
      ))
    }

    return (
      <div>
        <ShadowBox>
          {trades}
        </ShadowBox>
        <RebalanceWidget
          trades={this.props.trades}
        />
      </div>
    )
  }
};

const select = state => ({
  trades: selectCurrentGroupTrades(state),
});
const actions = {
};

export default connect(select, actions)(AccountTrades);
