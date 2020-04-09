import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { CashReturn, SubHeader, toDollarString } from './Performance';
import { useSelector } from 'react-redux';
import { selectTotalEquityTimeframe } from '../../selectors/performance';
import Tooltip from '../Tooltip';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

export const PerformanceChange = () => {
  const equityData = useSelector(selectTotalEquityTimeframe);

  if (!equityData) {
    return (
      <MarginBottom>
        <FontAwesomeIcon icon={faSpinner} spin />
      </MarginBottom>
    );
  }

  const change = toDollarString(
    equityData[0].value - equityData[equityData.length - 1].value,
  );

  const positive = !(change[0] === '-');

  return (
    <React.Fragment>
      <Tooltip label="Change in portfolio value between the start of the selected timeframe and now">
        <div>
          <SubHeader>Net Change</SubHeader>
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
