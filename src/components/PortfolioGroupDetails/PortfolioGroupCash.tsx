import React from 'react';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import Number from '../Number';

const CashBalance = styled.div`
  font-size: 20px;
  text-align: center;
`;

const CashGroup = styled.span`
  margin: 0 5px;
`;

const Cash = styled.div`
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const CashType = styled.span`
  margin-bottom: 8px;
  padding: 0 2px;
  display: inline-block;
  span {
    font-weight: 600;
  }
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 20px;
`;

type Props = {
  balances?: any[] | null;
};

const PortfolioGroupCash = ({ balances }: Props) => (
  <ShadowBox background="#BEE0DB">
    <Cash>
      <Title>Cash</Title>
      <CashBalance>
        {balances &&
          balances.map(balance => (
            <CashGroup key={balance.currency.id}>
              <CashType>
                <span title={balance.currency.name}>
                  {balance.currency.code}
                </span>
              </CashType>
              <CashType>
                <Number value={balance.cash} currency />
              </CashType>
            </CashGroup>
          ))}
      </CashBalance>
    </Cash>
  </ShadowBox>
);

export default PortfolioGroupCash;
