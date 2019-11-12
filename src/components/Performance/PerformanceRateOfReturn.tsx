import React from 'react';
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
`;

const GreenPercent = styled.span`
  padding: 10px;
  background-color: #04a287 !important;
  margin: 5px;
  color: white;
  font-weight: bold;
`;

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

const WhiteChange = styled.span`
  padding: 10px;
  background-color: #ffffff !important;
  margin: 5px;
  color: #04a287;
  font-weight: bold;
`;

export const TimespanSelector = (props: any) => {
  let timeframeString: string = '1Y';
  if (props.timeframe === Timeframe.YearToDate) {
    timeframeString = 'YTD';
  } else if (props.timeframe === Timeframe.ThirtyDays) {
    timeframeString = '30D';
  }

  return (
    <TimespanStyle>
      <button onClick={() => props.switchTimeframe(props.timeframe)}>
        {timeframeString}
      </button>
    </TimespanStyle>
  );
};

export const PerformanceRateOfReturn = () => {
  let currentTimeframe: Timeframe = Timeframe.OneYear as Timeframe;

  function switchTimeframe(timeframe: Timeframe) {
    currentTimeframe = timeframe;
  }
  let percentReturn = '6.83';
  let cashReturn = '18,745';
  if (currentTimeframe === Timeframe.ThirtyDays) {
    percentReturn = '1.43';
    cashReturn = '3,245';
  } else if (currentTimeframe === Timeframe.YearToDate) {
    percentReturn = '7.32';
    cashReturn = '20,321';
  }

  return (
    <React.Fragment>
      <SubHeader>
        Rate of Return
        <TimespanSelector
          timeframe={Timeframe.OneYear}
          switchTimeframe={(t: Timeframe) => switchTimeframe(t)}
        />
        <TimespanSelector
          timeframe={Timeframe.YearToDate}
          switchTimeframe={(t: Timeframe) => switchTimeframe(t)}
        />
        <TimespanSelector
          timeframe={Timeframe.ThirtyDays}
          switchTimeframe={(t: Timeframe) => switchTimeframe(t)}
        />
      </SubHeader>
      <br /> <br />
      <MarginBottom>
        <GreenPercent>
          {percentReturn}% <FontAwesomeIcon icon={faCaretUp} />
        </GreenPercent>
        <WhiteChange>
          ${cashReturn} <FontAwesomeIcon icon={faCaretUp} />
        </WhiteChange>
      </MarginBottom>
    </React.Fragment>
  );
};

export default PerformanceRateOfReturn;
