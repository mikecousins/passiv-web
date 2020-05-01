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
import { selectMonthlyDividends } from '../../selectors/performance';
import Tooltip from '../Tooltip';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

export const PerformanceMonthlyDividends = () => {
  const monthlyDividends = useSelector(selectMonthlyDividends);

  if (!monthlyDividends) {
    return (
      <MarginBottom>
        <FontAwesomeIcon icon={faSpinner} spin />
      </MarginBottom>
    );
  }

  const incomeString = toDollarString(monthlyDividends);

  const positive = !(incomeString[0] === '-');

  return (
    <React.Fragment>
      <Tooltip label="Average monthly income over the selected timeframe">
        <div>
          <SubHeader>
            Average Monthly Dividends{' '}
            <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
          </SubHeader>
          <CashReturn className={positive ? 'positive' : 'negative'}>
            ${incomeString}{' '}
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

export default PerformanceMonthlyDividends;
