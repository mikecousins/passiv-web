import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { AccountHoldings } from './AccountHoldings';
import PortfolioGroupMeta from './PortfolioGroupDetails/PortfolioGroupMetadata';
import PortfolioGroupTotal from './PortfolioGroupDetails/PortfolioGroupTotal';
import PortfolioGroupCash from './PortfolioGroupDetails/PortfolioGroupCash';
import {
  selectCurrentAccountHoldings,
  selectGroupsLoading,
  selectCurrentGroupCash,
} from '../selectors/groups';
import { selectCurrentAccountBalances } from '../selectors/accounts';

export const Container3Column = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    > div {
      width: 32%;
      margin-right: 30px;
    }
    > div:last-of-type {
      margin-right: 0;
    }
  }
`;

const NameBox = styled.div`
  font-size: 40px;
  font-weight: 400;
  padding-bottom: 30px;
`;

export const AccountTab = () => {
  const account = useSelector(selectCurrentAccountHoldings);
  const loading = useSelector(selectGroupsLoading);
  const balances = useSelector(selectCurrentAccountBalances);
  const cash = useSelector(selectCurrentGroupCash);

  if (!account) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  return (
    <div>
      <NameBox>
        {account.name} {loading && <FontAwesomeIcon icon={faSpinner} spin />}
      </NameBox>

      <Container3Column>
        <PortfolioGroupMeta />
        <PortfolioGroupCash balances={balances} cash={cash} />
        <PortfolioGroupTotal />
      </Container3Column>
      <AccountHoldings />
    </div>
  );
};

export default AccountTab;
