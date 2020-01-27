import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { CashReturn, SubHeader } from './Performance';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

type Props = {
  selectedTimeframe: string;
};

export const PerformanceChange = (props: Props) => {
  let example1Y = '4,745';
  let exampleYTD = '5,321';
  let example30D = '-842';

  let change = example1Y;
  if (props.selectedTimeframe === '30D') {
    change = example30D;
  } else if (props.selectedTimeframe === 'YTD') {
    change = exampleYTD;
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
