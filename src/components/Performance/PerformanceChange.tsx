import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faCaretUp,
  faCaretDown,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CashReturn, SubHeader, toDollarString } from './Performance';
import { useSelector } from 'react-redux';
import { selectTotalEquityTimeframe } from '../../selectors/performance';
import Tooltip from '../Tooltip';
import { selectSettings } from '../../selectors';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

export const PerformanceChange = () => {
  const equityData = useSelector(selectTotalEquityTimeframe);
  const settings = useSelector(selectSettings);
  const showInPercentage = settings?.roi_net_in_percentage;

  equityData?.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  if (!equityData) {
    return (
      <MarginBottom>
        <FontAwesomeIcon icon={faSpinner} spin />
      </MarginBottom>
    );
  }

  const equityChange =
    equityData[equityData.length - 1].value - equityData[0].value;

  let change = 'loading';

  if (showInPercentage) {
    const firstNonZeroEquity = equityData.find((data) => data.value > 0);
    if (firstNonZeroEquity) {
      change = ((equityChange / firstNonZeroEquity.value) * 100).toFixed(1);
    } else {
      change = '';
    }
  } else {
    change = toDollarString(equityChange);
  }

  const positive = !(change[0] === '-');

  return (
    <React.Fragment>
      <Tooltip label="Change in portfolio value between the start of the selected timeframe and now">
        <div>
          <SubHeader>
            Net Change{' '}
            <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
          </SubHeader>
          <CashReturn className={positive ? 'positive' : 'negative'}>
            {!showInPercentage && '$'}
            {change}
            {showInPercentage && '%'}{' '}
            {positive ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </CashReturn>
        </div>
      </Tooltip>
    </React.Fragment>
  );
};

export default PerformanceChange;
