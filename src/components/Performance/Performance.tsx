import React, { useState } from 'react';
import styled from '@emotion/styled';
import TotalHoldings from '../TotalHoldings';
import PerformanceRateOfReturn from './PerformanceRateOfReturn';
import PerformanceGroups from './PerformanceGroups';
import PerformanceContributions from './PerformanceContributions';
import { Timeframe } from './Timeframe';
import { Chart } from 'react-charts';
import PerformanceStat from './PerformanceStat';
import PerformanceChange from './PerformanceChange';
import { fetchBalanceTimeframe } from '../../actions';
import PerformanceChart from './PerformanceChart';
import PerformanceContributionChart from './PerformanceContributionChart';
import PerformanceTotalValueChart from './PerformanceTotalValueChart';

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
  timeframe: Timeframe;
  selectedTimeframe: Timeframe;
  setTimeframe: (newTimeFrame: Timeframe) => void;
};

export const TimespanSelector = (props: Props) => {
  let timeframeString: string = '1Y';
  if (props.timeframe === Timeframe.YearToDate) {
    timeframeString = 'YTD';
  } else if (props.timeframe === Timeframe.ThirtyDays) {
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
  const [currentTimeframe, setTimeframe] = useState(Timeframe.OneYear);

  return (
    <React.Fragment>
      <Header>Performance:</Header> <br />
      <AlignLeft>
        <TotalHoldings />
      </AlignLeft>
      <SubHeader>
        Timeframe
        <TimespanSelector
          timeframe={Timeframe.OneYear}
          selectedTimeframe={currentTimeframe}
          setTimeframe={(t: Timeframe) => setTimeframe(t)}
        />
        <TimespanSelector
          timeframe={Timeframe.YearToDate}
          selectedTimeframe={currentTimeframe}
          setTimeframe={(t: Timeframe) => setTimeframe(t)}
        />
        <TimespanSelector
          timeframe={Timeframe.ThirtyDays}
          selectedTimeframe={currentTimeframe}
          setTimeframe={(t: Timeframe) => setTimeframe(t)}
        />
      </SubHeader>
      <br /> <br />
      {/* Replace linebreaks with margins */}
      <PerformanceChange selectedTimeframe={currentTimeframe} />
      {/* <PerformanceRateOfReturn selectedTimeframe={currentTimeframe} /> */}
      <PerformanceTotalValueChart />
      <PerformanceContributionChart />
      {/* <ChartBox>
        <Chart data={data1} axes={axes} tooltip />
      </ChartBox>
      <br />
      <ChartBox>
        <Chart data={data2} axes={axes} tooltip />
      </ChartBox> */}
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
