import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faCaretUp,
  faCaretDown,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { CashReturn, SubHeader, toDollarString } from './Performance';
import {
  selectTotalEquityTimeframe,
  selectContributionTimeframeCumulative,
} from '../../selectors/performance';
import { PastValue } from '../../types/performance';
import Tooltip from '../Tooltip';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

const PerformanceCapitalGain = () => {
  const equityData: PastValue[] | undefined = useSelector(
    selectTotalEquityTimeframe,
  );
  equityData?.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const contributionData: PastValue[] | undefined = useSelector(
    selectContributionTimeframeCumulative,
  );
  contributionData?.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  let capitalGainsString = 'loading...';
  let capitalGains = 0;
  let changeInEquity = 0;
  let changeInContributions = 0;
  if (
    equityData !== null &&
    equityData !== undefined &&
    contributionData !== null &&
    contributionData !== undefined
  ) {
    changeInEquity =
      equityData[equityData.length - 1].value - equityData[0].value;
    changeInContributions =
      contributionData[contributionData.length - 1].value -
      contributionData[0].value;
    capitalGains = changeInEquity - changeInContributions;
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
      <Tooltip label="How the market has affected your portfolio between now and the start of the selected timeframe (this number excludes contributions and withdrawals)">
        <div>
          <SubHeader>
            Investment Growth{' '}
            <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
          </SubHeader>
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
