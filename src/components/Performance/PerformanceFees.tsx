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
import { selectFees } from '../../selectors/performance';
import Tooltip from '../Tooltip';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

export const PerformanceFees = () => {
  const fees = useSelector(selectFees);

  if (!fees && fees !== 0) {
    return (
      <MarginBottom>
        <FontAwesomeIcon icon={faSpinner} spin />
      </MarginBottom>
    );
  }

  const incomeString = toDollarString(fees);

  const positive = !(incomeString[0] === '-');

  return (
    <React.Fragment>
      <Tooltip label="Commission paid on trades during selected timeframe">
        <div>
          <SubHeader>
            Fees and Commission{' '}
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

export default PerformanceFees;
