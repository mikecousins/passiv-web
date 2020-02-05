import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { CashReturn, SubHeader, toDollarString } from './Performance';
import { useSelector } from 'react-redux';
import { selectTotalEquityTimeframe } from '../../selectors/performance';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

type Props = {
  selectedTimeframe: string;
};

export const PerformanceChange = (props: Props) => {
  const equityData = useSelector(selectTotalEquityTimeframe);

  let change = 'loading...';
  if (equityData != null && equityData != undefined) {
    change = toDollarString(
      equityData[0].value - equityData[equityData.length - 1].value,
    );
  }

  let positive = !(change[0] === '-');

  return (
    <React.Fragment>
      <MarginBottom>
        <SubHeader>Change</SubHeader>
      </MarginBottom>
      <MarginBottom>
        <CashReturn className={positive ? 'positive' : 'negative'}>
          ${change}{' '}
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

export default PerformanceChange;
