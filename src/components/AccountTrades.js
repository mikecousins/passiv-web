import React from 'react';
import RebalanceWidget from './RebalanceWidget';
import { H3, Table, Title, Symbol } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';

const TradesContainer = styled.div`
  position: relative;
  background-color: #001c55;
  color: #fff;
  border-radius: 4px;
  > div {
    background: none;
    text-align: right;
  }
`;
const Heading = styled.div`
  width: 35%;
  h3 {
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    text-align: left;
    line-height: 1;
  }
`;

export const AccountTrades = ({ trades }) => {
  let tradeList = null;
  if (trades && trades.trades.length > 0) {
    tradeList = trades.trades.map(trade => (
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
        {tradeList}
      </ShadowBox>
      <RebalanceWidget
        trades={trades}
      />
    </TradesContainer>
  )
};

export default AccountTrades;
