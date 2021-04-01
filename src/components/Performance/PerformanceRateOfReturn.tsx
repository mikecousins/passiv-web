import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faCaretUp,
  faCaretDown,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CashReturn, SubHeader } from './Performance';
import { useSelector } from 'react-redux';
import { selectRateOfReturn } from '../../selectors/performance';
import Tooltip from '../Tooltip';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

export const PerformanceRateOfReturn = () => {
  const rateOfReturn = useSelector(selectRateOfReturn);

  if (!rateOfReturn) {
    return (
      <MarginBottom>
        <FontAwesomeIcon icon={faSpinner} spin />
      </MarginBottom>
    );
  }

  const positive = rateOfReturn >= 0;

  return (
    <React.Fragment>
      <Tooltip label="Annualized Time Weighted Rate of Return for your Portfolio">
        <div>
          <SubHeader>
            Rate of Return{' '}
            <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: 12 }} />
          </SubHeader>
          <CashReturn className={positive ? 'positive' : 'negative'}>
            {(rateOfReturn * 100).toFixed(2)}%{' '}
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

export default PerformanceRateOfReturn;
