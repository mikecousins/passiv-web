import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShadowBox from '../styled/ShadowBox';
import { Table, H2} from '../styled/GlobalElements';
import styled from '@emotion/styled';
import Number from './Number';

export const CashContainer = styled.div`
  h2 {
    margin-bottom: 20px;
  }
  div {
    margin-bottom: 8px;
    justify-content: flex-start;
    margin-right: 10px;
  }
`;

const AccountBalance = (props) => {
  let content = (
    <CashContainer>
      <H2>Cash Balances</H2>
      {!props.balances && <div><FontAwesomeIcon icon={faSpinner} spin /></div>}
      {props.balances
        && props.balances.map(balance => (
        <Table key={balance.currency.id}>
          <div>
            <span title={balance.currency.name}>{balance.currency.code}</span>
          </div>
          <div>
            <Number value={balance.cash} currency />
          </div>
        </Table>
      ))
    }
    </CashContainer>
  )

  return (
    <ShadowBox>
      {content}
    </ShadowBox>
  )
};

export default AccountBalance;
