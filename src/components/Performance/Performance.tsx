import styled from '@emotion/styled';
import TotalHoldings from '../TotalHoldings';
import React from 'react';
//import PerformanceRateOfReturn from './PerformanceRateOfReturn';
import PerformanceChange from './PerformanceChange';
import PerformanceCapitalGains from './PerformanceCapitalGains';
import PerformanceContributions from './PerformanceContributions';
import PerformanceContributionChart from './PerformanceContributionChart';
import PerformanceTotalValueChart from './PerformanceTotalValueChart';
import PerformanceContributionStreak from './PerformanceContributionStreak';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTimeframe } from '../../actions/performance';
import { selectSelectedTimeframe } from '../../selectors/performance';

import { H1, P } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 250px;
  grid-column-gap: 20px;
`;

export const H1alt = styled(H1)`
  line-height: 1.5;
`;

// Below doesn't work right now
const AlignLeft = styled.div`
  margin-top: 5px;
  text-align: left !important;
`;

const Tiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
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
    background-color: #ad4629 !important;
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
    color: #ad4629;
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
  margin-bottom: 20px;
  text-align: center;
  padding-top: 10px;
`;

type Props = {
  timeframe: string;
  selectedTimeframe: string;
  setTimeframe: (newTimeFrame: string) => void;
};

export const TimespanSelector = (props: Props) => {
  let timeframeString = '1Y';
  if (props.timeframe === '1Y') {
    timeframeString = '1 Year';
  }
  if (props.timeframe === 'YTD') {
    timeframeString = 'Year to Date';
  } else if (props.timeframe === '30D') {
    timeframeString = '30 Days';
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
      <Flex>
        <div>
          <H1alt>Performance</H1alt>
          <P>How are your portfolio's doing?</P>
        </div>
        <AlignLeft>
          <TotalHoldings />
        </AlignLeft>
      </Flex>
      <TimeContainer>
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
      </TimeContainer>
      <Grid>
        {/* Replace linebreaks with margins */}
        <div>
          <ShadowBox>
            <PerformanceContributionChart
              selectedTimeframe={currentTimeframe}
            />
          </ShadowBox>
          <ShadowBox>
            <PerformanceTotalValueChart selectedTimeframe={currentTimeframe} />
          </ShadowBox>
        </div>
        <Tiles>
          <ShadowBox>
            {/* <PerformanceRateOfReturn selectedTimeframe={currentTimeframe} /> */}
            <PerformanceContributionStreak
              selectedTimeframe={currentTimeframe}
            />
          </ShadowBox>
          <ShadowBox>
            {/* <PerformanceRateOfReturn selectedTimeframe={currentTimeframe} /> */}
            <PerformanceContributions selectedTimeframe={currentTimeframe} />
          </ShadowBox>
          <ShadowBox>
            <PerformanceChange selectedTimeframe={currentTimeframe} />
          </ShadowBox>
          <ShadowBox>
            <PerformanceCapitalGains selectedTimeframe={currentTimeframe} />
          </ShadowBox>
        </Tiles>
      </Grid>
      {/* <PerformanceStat title="Dividends" value={34.24} />
      <PerformanceStat title="Deposits" value={2000} />
      <PerformanceStat title="Withdrawals" value={0} />
      <PerformanceStat title="Taxes and Fees" value={-45.24} />
      <PerformanceGroups selectedTimeframe={currentTimeframe} /> */}
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
