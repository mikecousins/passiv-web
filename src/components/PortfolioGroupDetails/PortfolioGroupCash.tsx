import React from 'react';
import ShadowBox from '../../styled/ShadowBox';
import Number from '../Number';
import {
  CashBalance,
  CashGroup,
  Cash,
  CashType,
  Title,
} from '../../styled/PortfolioGroupDetails';

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
