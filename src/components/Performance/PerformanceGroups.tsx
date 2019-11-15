import React from 'react';
import { useSelector } from 'react-redux';
import AccountGroup from '../Accounts/AccountGroup';
import styled from '@emotion/styled';
import { selectGroups } from '../../selectors/groups';
import PerformanceRateOfReturn from './PerformanceRateOfReturn';
import { Timeframe } from './Timeframe';

const AccountRow = styled.span`
  padding: 5px;
  cursor: pointer;
`;

const SubHeader = styled.div`
  font-size: 14pt;
  margin-bottom: 20px;
`;

type Props = {
  selectedTimeframe: Timeframe;
};

export const PerformanceGroups = (props: Props) => {
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
          <PerformanceRateOfReturn
            selectedTimeframe={props.selectedTimeframe}
          />
        </AccountRow>
      ))}
    </div>
  );
};

export default PerformanceGroups;
