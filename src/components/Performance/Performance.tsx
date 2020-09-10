import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import PerformanceChange from './PerformanceChange';
import PerformanceCapitalGains from './PerformanceCapitalGains';
import PerformanceContributions from './PerformanceContributions';
import PerformanceContributionChart from './PerformanceContributionChart';
import PerformanceTotalValueChart from './PerformanceTotalValueChart';
import PerformanceContributionStreak from './PerformanceContributionStreak';
import PerformanceDividendChart from './PerformanceDividendChart';
import PerformanceMonthlyDividends from './PerformanceMonthlyDividends';
import PerformanceDividendTimelineChart from './PerformanceDividendTimelineChart';
import PerformanceDividendIncome from './PerformanceDividendIncome';
import PerformanceFees from './PerformanceFees';
import PerformanceFeeSavings from './PerformanceFeeSavings';
import { setSelectedTimeframe } from '../../actions/performance';
import { selectSelectedTimeframe } from '../../selectors/performance';
import ShadowBox from '../../styled/ShadowBox';
import TimeframePicker from './TimeframePicker';
import { P, A } from '../../styled/GlobalElements';

const Grid = styled.div`
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: auto 250px;
    grid-column-gap: 20px;
  }
`;

const Tiles = styled.div`
  @media (min-width: 900px) {
    display: grid;
  }
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

export const SubHeader = styled.div`
  font-size: 18px;
  margin-bottom: 14px;
  text-align: center;
`;

const BetaBanner = styled(P)`
  text-align: center;
  padding-bottom: 20px;
  color: #555555;
`;

export const Performance = () => {
  const dispatch = useDispatch();
  let currentTimeframe = useSelector(selectSelectedTimeframe);
  let showDatePickers = false;
  if (currentTimeframe === 'CST') {
    showDatePickers = true;
  }

  return (
    <React.Fragment>
      <TimeframePicker
        timeframe={'CST'}
        selectedTimeframe={currentTimeframe}
        setTimeframe={t => dispatch(setSelectedTimeframe(t))}
        showDatePickers={showDatePickers}
      />
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
      <Grid>
        <ShadowBox>
          <PerformanceDividendTimelineChart />
        </ShadowBox>
        <Tiles>
          <ShadowBox>
            <PerformanceMonthlyDividends />
          </ShadowBox>
          <ShadowBox>
            <PerformanceFees />
          </ShadowBox>
        </Tiles>
      </Grid>
      <Grid>
        <ShadowBox>
          <PerformanceDividendChart />
        </ShadowBox>
        <Tiles>
          <ShadowBox>
            <PerformanceFeeSavings />
          </ShadowBox>
          <ShadowBox>
            <PerformanceDividendIncome />
          </ShadowBox>
        </Tiles>
      </Grid>
      <BetaBanner>
        Open Beta: Help us improve our tools by{' '}
        <A href="mailto:reporting@getpassiv.com">sharing feedback</A>
      </BetaBanner>
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
