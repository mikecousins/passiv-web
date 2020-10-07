import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import AccountGroup from '../Accounts/AccountGroup';
import { selectGroups } from '../../selectors/groups';
import PerformanceRateOfReturn from './PerformanceRateOfReturn';

const AccountRow = styled.span`
  padding: 5px;
`;

const SubHeader = styled.div`
  font-size: 14pt;
  margin-bottom: 20px;
`;

type Props = {
  selectedTimeframe: string;
};

export const PerformanceGroups: FunctionComponent<Props> = ({
  selectedTimeframe,
}) => {
  const groups = useSelector(selectGroups);

  if (!groups) {
    return null;
  }

  return (
    <div>
      <SubHeader>Check specific group:</SubHeader>
      {groups.map((group) => (
        <AccountRow>
          <AccountGroup name={group.name} />
          <PerformanceRateOfReturn selectedTimeframe={selectedTimeframe} />
        </AccountRow>
      ))}
    </div>
  );
};

export default PerformanceGroups;
