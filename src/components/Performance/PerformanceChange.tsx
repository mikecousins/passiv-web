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

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

const PerformanceChange = () => {
  const equityData = useSelector(selectTotalEquityTimeframe);
  equityData?.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  if (!equityData) {
    return (
      <MarginBottom>
        <FontAwesomeIcon icon={faSpinner} spin />
      </MarginBottom>
    );
  }

  const change = toDollarString(
    equityData[equityData.length - 1].value - equityData[0].value,
  );

  const positive = !(change[0] === '-');

  return (
    <React.Fragment>
      <Tooltip label="Change in portfolio value between the start of the selected timeframe and now (this number includes contributions and withdrawals)">
        <div>
          <SubHeader>
            Net Change{' '}
            <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
          </SubHeader>
          <CashReturn className={positive ? 'positive' : 'negative'}>
            ${change}{' '}
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
