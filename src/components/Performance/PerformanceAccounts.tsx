import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountGroup from '../Accounts/AccountGroup';
import styled from '@emotion/styled';
import { selectGroupedAccounts } from '../../selectors/groups';
import AccountRow from '../Accounts/AccountRow';

const Pointer = styled.span`
  cursor: pointer;
`;

const SubHeader = styled.div`
  font-size: 14pt;
`;

export const PerformanceAccounts = () => {
  const accounts = useSelector(selectGroupedAccounts);
  if (!accounts) {
    return null;
  }
  return (
    <div>
      <SubHeader>Check specific account:</SubHeader>
      <Pointer>
        {accounts.map(group =>
          group.accounts.map(account => <AccountRow account={account} />),
        )}
      </Pointer>
    </div>
  );
};

export default PerformanceAccounts;
