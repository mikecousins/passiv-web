import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { CashReturn, SubHeader, toDollarString } from './Performance';
import { useSelector } from 'react-redux';
import { selectTotalEquityTimeframe } from '../../selectors/performance';
import { PastValue } from '../../types/performance';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

type Props = {
  selectedTimeframe: string;
};

export const PerformanceChange = (props: Props) => {
  const equityData: PastValue[] | undefined = useSelector(
    selectTotalEquityTimeframe,
  );

  let change = 'loading...';
  if (equityData !== null && equityData !== undefined) {
    change = toDollarString(
      equityData[0].value - equityData[equityData.length - 1].value,
    );
  }

  let positive = !(change[0] === '-');
  if (change === 'loading...') {
    return (
      <MarginBottom>
        <FontAwesomeIcon icon={faSpinner} spin />
      </MarginBottom>
    );
  }

  return (
    <React.Fragment>
      <SubHeader>Change</SubHeader>
      <CashReturn className={positive ? 'positive' : 'negative'}>
        ${change}{' '}
        {positive ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </CashReturn>
    </React.Fragment>
  );
};

export default PerformanceChange;
