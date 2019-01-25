import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrentGroupTrades } from '../selectors';
import RebalanceWidget from './RebalanceWidget';
import { H3, Table } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';


export const TradesContainer = styled.div`
  position: relative;
`;

class AccountTrades extends Component {
  render() {
    let trades = null;
    if (this.props.trades && this.props.trades.trades.length > 0) {
      trades = this.props.trades.trades.map(trade => (
        <Table key={trade.id}>
          <div>
            <H3>{trade.action}</H3>
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
        </Table>
      ))
    }

    return (
      <TradesContainer>
        <ShadowBox>
          {trades}
        </ShadowBox>
        <RebalanceWidget
          trades={this.props.trades}
        />
      </TradesContainer>
    )
  }
};

const select = state => ({
  trades: selectCurrentGroupTrades(state),
});
const actions = {
};

export default connect(select, actions)(AccountTrades);
