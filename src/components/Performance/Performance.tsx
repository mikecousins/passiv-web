import React from 'react';
import { useSelector } from 'react-redux';
import { selectGroupedAccounts } from '../../selectors/groups';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import TotalHoldings from '../TotalHoldings';
import PerformanceRateOfReturn from './PerformanceRateOfReturn';
import PerformanceGroups from './PerformanceGroups';
import { Timeframe } from './Timeframe';

const Header = styled.div`
  font-size: 20pt;
`;

// Below doesn't work right now
const AlignLeft = styled.div`
  text-align: left !important;
`;

export const Performance = () => {
  return (
    <React.Fragment>
      <Header>Performance:</Header> <br />
      <AlignLeft>
        <TotalHoldings />
      </AlignLeft>
      <PerformanceRateOfReturn />
      <br />
      <PerformanceGroups />
    </React.Fragment>
  );
};

export default Performance;
