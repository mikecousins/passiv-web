import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
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
  cash?: number | null;
  error?: any;
};

const PortfolioGroupCash = ({ balances, cash, error }: Props) => {
  let cashValue = null;

  if (error) {
    cashValue = <FontAwesomeIcon icon={faExclamationTriangle} />;
  } else {
    cashValue = cash ? (
      <Number value={cash} currency />
    ) : (
      <FontAwesomeIcon icon={faSpinner} spin />
    );
  }

  const cashBalance = (
    <React.Fragment>
      {balances &&
        balances.map(balance => (
          <CashGroup key={balance.currency.id}>
            <CashType>
              <span title={balance.currency.name}>{balance.currency.code}</span>
            </CashType>
            <CashType>
              <Number value={balance.cash} currency />
            </CashType>
          </CashGroup>
        ))}
    </React.Fragment>
  );

  return (
    <ShadowBox background="#BEE0DB">
      <Cash>
        <Title>Cash</Title>
        <CashBalance>{cashBalance}</CashBalance>
      </Cash>
    </ShadowBox>
  );
};

export default PortfolioGroupCash;
