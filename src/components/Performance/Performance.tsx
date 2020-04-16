import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import React, { FunctionComponent } from 'react';
import PerformanceChange from './PerformanceChange';
import PerformanceCapitalGains from './PerformanceCapitalGains';
import PerformanceContributions from './PerformanceContributions';
import PerformanceContributionChart from './PerformanceContributionChart';
import PerformanceTotalValueChart from './PerformanceTotalValueChart';
import PerformanceContributionStreak from './PerformanceContributionStreak';
import { setSelectedTimeframe } from '../../actions/performance';
import { selectSelectedTimeframe } from '../../selectors/performance';
import ShadowBox from '../../styled/ShadowBox';

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 250px;
  grid-column-gap: 20px;
`;

const Tiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
    font-size: 25px;
  }
`;

export const PercentReturn = styled.span`
  padding: 10px;
  margin: 5px;
  color: white;
  &.positive {
    background-color: #04a287 !important;
  }
  &.negative {
    background-color: #003ba2 !important;
  }
`;

export const CashReturn = styled.span`
  padding: 10px;
  background-color: #ffffff;
  margin: 5px;
  color: #04a287;
  &.positive {
    color: #04a287;
  }
  &.negative {
    color: #003ba2;
  }
`;

const TimeContainer = styled.div`
  border-radius: 6px;
  background: var(--brand-grey);
  border: 1px solid #04a185;
  width: 400px;
  margin: 0 auto 20px;
  display: flex;
  box-shadow: 0 4px 12px 2px rgba(2, 2, 2, 0.26);
`;

const TimespanStyle = styled.span`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  display: inline-block;
  flex: 1;
  border-right: 1px solid #04a185;
  button {
    color: #fff;
    padding: 12px 5px;
  }
  &:last-of-type {
    border-right: none;
  }
  &.selected {
    background-color: #04a286;
  }
`;

export const SubHeader = styled.div`
  font-size: 18px;
  margin-bottom: 14px;
  text-align: center;
`;

type Props = {
  timeframe: string;
  selectedTimeframe: string;
  setTimeframe: (newTimeFrame: string) => void;
};

export const TimespanSelector: FunctionComponent<Props> = ({
  timeframe,
  selectedTimeframe,
  setTimeframe,
}) => {
  let timeframeString = '1Y';
  if (timeframe === '1Y') {
    timeframeString = '1 Year';
  }
  if (timeframe === 'YTD') {
    timeframeString = 'Year to Date';
  } else if (timeframe === 'ALL') {
    timeframeString = 'All Time';
  } else if (timeframe === '30D') {
    timeframeString = '30 Days';
  }

  let selected = timeframe === selectedTimeframe;

  return (
    <TimespanStyle className={selected ? 'selected' : ''}>
      <button onClick={() => setTimeframe(timeframe)}>{timeframeString}</button>
    </TimespanStyle>
  );
};

export const Performance = () => {
  const dispatch = useDispatch();
  let currentTimeframe = useSelector(selectSelectedTimeframe);

  return (
    <React.Fragment>
      <TimeContainer>
        <TimespanSelector
          timeframe={'1Y'}
          selectedTimeframe={currentTimeframe}
          setTimeframe={t => dispatch(setSelectedTimeframe(t))}
        />
        <TimespanSelector
          timeframe={'YTD'}
          selectedTimeframe={currentTimeframe}
          setTimeframe={t => dispatch(setSelectedTimeframe(t))}
        />
        <TimespanSelector
          timeframe={'ALL'}
          selectedTimeframe={currentTimeframe}
          setTimeframe={t => dispatch(setSelectedTimeframe(t))}
        />
      </TimeContainer>
      <Grid>
        <ShadowBox>
          <PerformanceContributionChart />
        </ShadowBox>
        <Tiles>
          <ShadowBox>
            <PerformanceContributions selectedTimeframe={currentTimeframe} />
          </ShadowBox>
          <ShadowBox>
            <PerformanceContributionStreak />
          </ShadowBox>
        </Tiles>
      </Grid>
      <Grid>
        <ShadowBox>
          <PerformanceTotalValueChart />
        </ShadowBox>
        <Tiles>
          <ShadowBox>
            <PerformanceChange />
          </ShadowBox>
          <ShadowBox>
            <PerformanceCapitalGains />
          </ShadowBox>
        </Tiles>
      </Grid>
    </React.Fragment>
  );
};

export default Performance;

export const toDollarString = (dollars: number) => {
  let dollarString = dollars.toFixed(0);
  let index = dollarString.length - 3;
  while ((index > 0 && dollarString[0] !== '-') || index > 1) {
    dollarString =
      dollarString.slice(0, index) + ',' + dollarString.slice(index);
    index -= 3;
  }
  return dollarString;
};
