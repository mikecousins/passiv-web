import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { Table, Title } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import Number from '../Number';

const CashBalance = styled.div`
  text-align: center;
`;

const Cash = styled.div`
  text-align: center;
`;

const CashType = styled.div`
  margin-bottom: 8px;
  span {
    font-weight: 600;
  }
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
          <Table key={balance.currency.id}>
            <CashType>
              <span title={balance.currency.name}>{balance.currency.code}</span>
            </CashType>
            <CashType>
              <Number value={balance.cash} currency />
            </CashType>
          </Table>
        ))}
    </React.Fragment>
  );

  return (
    <ShadowBox background="#BEE0DB">
      <CashBalance>{cashBalance}</CashBalance>
      <Cash>
        <Title>Cash</Title>
        {cashValue}
      </Cash>
    </ShadowBox>
  );
};

export default PortfolioGroupCash;
