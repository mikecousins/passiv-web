import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { CashReturn, SubHeader, toDollarString } from './Performance';
import { useSelector } from 'react-redux';
import {
  selectTotalEquityTimeframe,
  selectContributions,
} from '../../selectors/performance';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

type Props = {
  selectedTimeframe: string;
};

export const PerformanceCapitalGain = (props: Props) => {
  const equityData = useSelector(selectTotalEquityTimeframe);
  const contributions = useSelector(selectContributions);

  let capitalGainsString = 'loading...';
  let capitalGains = 0;
  let change = 0;
  if (
    contributions != null &&
    contributions != undefined &&
    equityData != null &&
    equityData != undefined
  ) {
    change = equityData[0].value - equityData[equityData.length - 1].value;
    capitalGains = change - contributions.contributions;
    capitalGainsString = toDollarString(capitalGains);
  }

  let positive = !(capitalGainsString[0] === '-');

  if (capitalGainsString === 'loading...') {
    return (
      <MarginBottom>
        <FontAwesomeIcon icon={faSpinner} spin />
      </MarginBottom>
    );
  }

  return (
    <React.Fragment>
      <MarginBottom>
        <SubHeader>Capital Gains</SubHeader>
      </MarginBottom>
      <MarginBottom>
        <CashReturn className={positive ? 'positive' : 'negative'}>
          ${capitalGainsString}{' '}
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

export default PerformanceCapitalGain;
