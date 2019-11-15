import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Timeframe } from './Timeframe';
import { PercentReturn, CashReturn, SubHeader } from './Performance';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

type Props = {
  selectedTimeframe: Timeframe;
};

export const PerformanceRateOfReturn = (props: Props) => {
  let example1Yp = '6.83';
  let example1Yc = '18,745';
  let exampleYTDp = '7.32';
  let exampleYTDc = '20,321';
  let example30Dp = '-0.43';
  let example30Dc = '-1,245';

  let percentReturn = example1Yp;
  let cashReturn = example1Yc;
  if (props.selectedTimeframe === Timeframe.ThirtyDays) {
    percentReturn = example30Dp;
    cashReturn = example30Dc;
  } else if (props.selectedTimeframe === Timeframe.YearToDate) {
    percentReturn = exampleYTDp;
    cashReturn = exampleYTDc;
  }

  let positive = !(percentReturn[0] === '-');

  return (
    <React.Fragment>
      <MarginBottom>
        <PercentReturn className={positive ? 'positive' : 'negative'}>
          {percentReturn}%{' '}
          {positive ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </PercentReturn>
        <CashReturn className={positive ? 'positive' : 'negative'}>
          ${cashReturn}{' '}
          {positive ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </CashReturn>
      </MarginBottom>
    </React.Fragment>
  );
};

export default PerformanceRateOfReturn;
