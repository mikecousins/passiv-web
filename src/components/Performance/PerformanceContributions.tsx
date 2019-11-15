import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CashReturn, SubHeader } from './Performance';
import { Timeframe } from './Timeframe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

type Props = {
  selectedTimeframe: Timeframe;
};

export const PerformanceContributions = (props: Props) => {
  let contributions = '22,500';
  if (props.selectedTimeframe === Timeframe.ThirtyDays) {
    contributions = '2,000';
  } else if (props.selectedTimeframe === Timeframe.YearToDate) {
    contributions = '19,800';
  }
  let positive = !(contributions[0] === '-');

  return (
    <React.Fragment>
      <SubHeader>Contributions</SubHeader>
      <br />
      <CashReturn className={positive ? 'positive' : 'negative'}>
        ${contributions} <FontAwesomeIcon icon={faCaretUp} />
      </CashReturn>
    </React.Fragment>
  );
};

export default PerformanceContributions;
