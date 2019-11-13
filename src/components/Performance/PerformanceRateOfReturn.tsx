import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGroupedAccounts } from '../../selectors/groups';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import TotalHoldings from '../TotalHoldings';
import { Timeframe } from './Timeframe';

const SubHeader = styled.div`
  font-size: 14pt;
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

const PercentReturn = styled.span`
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

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

const CashReturn = styled.span`
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

  let classNames = '';
  let selected = props.timeframe === props.selectedTimeframe;

  return (
    <TimespanStyle className={selected ? 'selected' : ''}>
      <button onClick={() => props.setTimeframe(props.timeframe)}>
        {timeframeString}
      </button>
    </TimespanStyle>
  );
};

export const PerformanceRateOfReturn = () => {
  const [currentTimeframe, setTimeframe] = useState(Timeframe.OneYear);

  let example1Yp = '6.83';
  let example1Yc = '18,745';
  let exampleYTDp = '7.32';
  let exampleYTDc = '20,321';
  let example30Dp = '-0.43';
  let example30Dc = '-1,245';

  let percentReturn = example1Yp;
  let cashReturn = example1Yc;
  if (currentTimeframe === Timeframe.ThirtyDays) {
    percentReturn = example30Dp;
    cashReturn = example30Dc;
  } else if (currentTimeframe === Timeframe.YearToDate) {
    percentReturn = exampleYTDp;
    cashReturn = exampleYTDc;
  }

  let positive = !(percentReturn[0] === '-');

  return (
    <React.Fragment>
      <SubHeader>
        Rate of Return
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
      <MarginBottom>
        <PercentReturn className={positive ? 'positive' : 'negative'}>
          {percentReturn}% <FontAwesomeIcon icon={faCaretUp} />
        </PercentReturn>
        <CashReturn className={positive ? 'positive' : 'negative'}>
          ${cashReturn} <FontAwesomeIcon icon={faCaretUp} />
        </CashReturn>
      </MarginBottom>
    </React.Fragment>
  );
};

export default PerformanceRateOfReturn;
