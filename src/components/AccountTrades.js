import React, { Component } from 'react';
import RebalanceWidget from './RebalanceWidget';
import { H3, Table, Title, Symbol } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';

export const TradesContainer = styled.div`
  position: relative;
  background-color: #001c55;
  color: #fff;
  border-radius: 4px;
  > div {
    background: none;
    text-align: right;
  }
`;
export const Heading = styled.div`
  width: 35%;
  h3 {
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    text-align: left;
    line-height: 1;
  }
`;
class AccountTrades extends Component {
  render() {
    let trades = null;
    if (this.props.trades && this.props.trades.trades.length > 0) {
      trades = this.props.trades.trades.map(trade => (
        <Table key={trade.id}>
          <Heading>
            <H3>{trade.action}</H3>
          </Heading>
          <div>
            <Title>{trade.universal_symbol.description}</Title>
            <Symbol>{trade.universal_symbol.symbol}</Symbol>
          </div>
          <div>
            <Title>Units</Title>
            <div>{trade.units}</div>
          </div>
          <div>
            <Title>Price</Title>
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

export default AccountTrades;
