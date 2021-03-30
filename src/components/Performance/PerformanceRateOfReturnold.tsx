import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { PercentReturn, CashReturn, SubHeader } from './Performance';

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

type Props = {
  selectedTimeframe: string;
};

export const PerformanceRateOfReturn: FunctionComponent<Props> = ({
  selectedTimeframe,
}) => {
  let example1Yp = '6.83';
  let example1Yc = '4,745';
  let exampleYTDp = '7.32';
  let exampleYTDc = '5,321';
  let example30Dp = '-0.43';
  let example30Dc = '-842';

  let percentReturn = example1Yp;
  let cashReturn = example1Yc;
  if (selectedTimeframe === '30D') {
    percentReturn = example30Dp;
    cashReturn = example30Dc;
  } else if (selectedTimeframe === 'YTD') {
    percentReturn = exampleYTDp;
    cashReturn = exampleYTDc;
  }

  let positive = !(percentReturn[0] === '-');

  return (
    <React.Fragment>
      <MarginBottom>
        <SubHeader>Rate of Return</SubHeader>
      </MarginBottom>
      <MarginBottom>
        <PercentReturn className={positive ? 'positive' : 'negative'}>
          {percentReturn}%{' '}
          {positive ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </PercentReturn>
        <CashReturn className={positive ? 'positive' : 'negative'}>
          ${cashReturn}{' '}
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

export default PerformanceRateOfReturn;
