import React from 'react';
import { useSelector } from 'react-redux';
import { selectGroupedAccounts } from '../../selectors/groups';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import TotalHoldings from '../TotalHoldings';
import PerformanceRateOfReturn from './PerformanceRateOfReturn';

const Header = styled.div`
  font-size: 20pt;
`;

const SubHeader = styled.div`
  font-size: 14pt;
`;

const GreenPercent = styled.span`
  padding: 10px;
  background-color: #04a287 !important;
  margin: 5px;
  color: white;
  font-weight: bold;
`;

const WhiteChange = styled.span`
  padding: 10px;
  background-color: #ffffff !important;
  margin: 5px;
  color: #04a287;
  font-weight: bold;
`;

// Below doesn't work right now
const AlignLeft = styled.div`
  text-align: left !important;
`;

export const Performance = () => {
  const accounts = useSelector(selectGroupedAccounts);
  let totalAssets: number = 0;

  if (!accounts) {
    return null;
  }
  // accounts.map(group =>
  //   group.accounts.map(account => totalAssets += account.worth),
  // );
  return (
    <React.Fragment>
      <Header>Performance:</Header> <br />
      <AlignLeft>
        <TotalHoldings />
      </AlignLeft>
      <PerformanceRateOfReturn />
    </React.Fragment>
  );
};

export default Performance;
