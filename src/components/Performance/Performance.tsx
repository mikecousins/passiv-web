import React, { useState } from 'react';
import styled from '@emotion/styled';
import TotalHoldings from '../TotalHoldings';
import PerformanceRateOfReturn from './PerformanceRateOfReturn';
import PerformanceGroups from './PerformanceGroups';
import PerformanceContributions from './PerformanceContributions';
import { Chart } from 'react-charts';
import PerformanceStat from './PerformanceStat';
import PerformanceChange from './PerformanceChange';
import PerformanceChart from './PerformanceChart';
import PerformanceContributionChart from './PerformanceContributionChart';
import PerformanceTotalValueChart from './PerformanceTotalValueChart';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTimeframe } from '../../actions';
import { selectSelectedTimeframe } from '../../selectors/performance';

const Header = styled.div`
  font-size: 20pt;
`;

// Below doesn't work right now
const AlignLeft = styled.div`
  text-align: left !important;
`;

export const PercentReturn = styled.span`
  padding: 10px;
  margin: 5px;
  color: white;
  font-weight: bold;
  &.positive {
    background-color: #04a287 !important;
  }
  &.negative {
    background-color: #ad4629 !important;
  }
`;

export const CashReturn = styled.span`
  padding: 10px;
  background-color: #ffffff !important;
  margin: 5px;
  color: #04a287;
  font-weight: bold;
  &.positive {
    color: #04a287;
  }
  &.negative {
    color: #ad4629;
  }
`;

const TimespanStyle = styled.span`
  padding: 5px;
  background-color: #cccccc !important;
  margin: 5px;
  color: black;
  font-weight: bold;
  font-size: 10pt;
  text-align: center;
  &.selected {
    background-color: #aaaaaa !important;
  }
`;

export const SubHeader = styled.div`
  font-size: 14pt;
`;

type Props = {
  timeframe: string;
  selectedTimeframe: string;
  setTimeframe: (newTimeFrame: string) => void;
};

export const TimespanSelector = (props: Props) => {
  let timeframeString = '1Y';
  if (props.timeframe === '1Y') {
    timeframeString = '1Y';
  }
  if (props.timeframe === 'YTD') {
    timeframeString = 'YTD';
  } else if (props.timeframe === '30D') {
    timeframeString = '30D';
  }

  let selected = props.timeframe === props.selectedTimeframe;

  return (
    <TimespanStyle className={selected ? 'selected' : ''}>
      <button onClick={() => props.setTimeframe(props.timeframe)}>
        {timeframeString}
      </button>
    </TimespanStyle>
  );
};

export const Performance = () => {
  //const [currentTimeframe, setTimeframe] = useState(Timeframe.OneYear);
  const dispatch = useDispatch();
  let currentTimeframe = useSelector(selectSelectedTimeframe);

  return (
    <React.Fragment>
      <Header>Performance:</Header> <br />
      <AlignLeft>
        <TotalHoldings />
      </AlignLeft>
      <SubHeader>
        Timeframe
        <TimespanSelector
          timeframe={'1Y'}
          selectedTimeframe={currentTimeframe}
          setTimeframe={(t: string) => dispatch(setSelectedTimeframe(t))}
        />
        <TimespanSelector
          timeframe={'YTD'}
          selectedTimeframe={currentTimeframe}
          setTimeframe={(t: string) => dispatch(setSelectedTimeframe(t))}
        />
        <TimespanSelector
          timeframe={'30D'}
          selectedTimeframe={currentTimeframe}
          setTimeframe={(t: string) => dispatch(setSelectedTimeframe(t))}
        />
      </SubHeader>
      <br /> <br />
      {/* Replace linebreaks with margins */}
      <PerformanceChange selectedTimeframe={currentTimeframe} />
      {/* <PerformanceRateOfReturn selectedTimeframe={currentTimeframe} /> */}
      <PerformanceTotalValueChart selectedTimeframe={currentTimeframe} />
      <PerformanceContributionChart selectedTimeframe={currentTimeframe} />
      <PerformanceContributions selectedTimeframe={currentTimeframe} />
      <br />
      <br />
      {/* <PerformanceStat title="Dividends" value={34.24} />
      <PerformanceStat title="Deposits" value={2000} />
      <PerformanceStat title="Withdrawals" value={0} />
      <PerformanceStat title="Taxes and Fees" value={-45.24} />
      <PerformanceGroups selectedTimeframe={currentTimeframe} /> */}
    </React.Fragment>
  );
};

export default Performance;
