import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountGroup from '../Accounts/AccountGroup';
import styled from '@emotion/styled';
import { selectGroups } from '../../selectors/groups';

const AccountRow = styled.span`
  padding: 5px;
  cursor: pointer;
`;

const SubHeader = styled.div`
  font-size: 14pt;
  margin-bottom: 20px;
`;

export const PerformanceGroups = () => {
  const groups = useSelector(selectGroups);
  if (!groups) {
    return null;
  }
  return (
    <div>
      <SubHeader>Check specific group:</SubHeader>
      {groups.map(group => (
        <AccountRow>
          <AccountGroup name={group.name} />
        </AccountRow>
      ))}
    </div>
  );
};

export default PerformanceGroups;
