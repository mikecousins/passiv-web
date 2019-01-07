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
        <div key={trade.id} className="border-grey-lighter py-2 flex w-full">
          <div className="w-1/6 text-center font-bold">
            <h3>{trade.action}</h3>
          </div>
          <div className="w-3/6 text-center">
            <div>{trade.universal_symbol.description}</div>
            <div>{trade.universal_symbol.symbol}</div>
          </div>
          <div className="w-1/6 text-center">
            <div>Units</div>
            <div>{trade.units}</div>
          </div>
          <div className="w-1/6 text-center">
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
