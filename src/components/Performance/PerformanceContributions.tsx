import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CashReturn, SubHeader } from './Performance';
import { Timeframe } from './Timeframe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

export const PerformanceContributions = () => {
  const contributions = '2,000';
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
