import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { CashReturn, SubHeader, toDollarString } from './Performance';
import {
  selectTotalEquityTimeframe,
  selectContributions,
} from '../../selectors/performance';
import { PastValue } from '../../types/performance';
import Tooltip from '../Tooltip';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

export const PerformanceCapitalGain = () => {
  const equityData: PastValue[] | undefined = useSelector(
    selectTotalEquityTimeframe,
  );
  const contributions = useSelector(selectContributions);

  let capitalGainsString = 'loading...';
  let capitalGains = 0;
  let change = 0;
  if (
    contributions !== null &&
    contributions !== undefined &&
    equityData !== null &&
    equityData !== undefined
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
      <Tooltip label="How the market has affected your portfolio between now and the start of the selected timeframe">
        <div>
          <SubHeader>Investment Growth</SubHeader>
          <CashReturn className={positive ? 'positive' : 'negative'}>
            {positive ? (
              <span>
                {'$'}
                {capitalGainsString} <FontAwesomeIcon icon={faCaretUp} />
              </span>
            ) : (
              <span>
                {'-'}${capitalGainsString.substr(1)}{' '}
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            )}
          </CashReturn>
        </div>
      </Tooltip>
    </React.Fragment>
  );
};

export default PerformanceCapitalGain;
