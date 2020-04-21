import React from 'react';
import Number from '../Number';
import styled from '@emotion/styled';

import {
  BarsContainer,
  Symbol,
  Target,
  Actual,
  Bar,
  BarTarget,
  BarActual,
  Container,
  CashTargetRow
} from '../../styled/Target';

type Props = {
  edit: boolean;
  percentage: number;
  actualPercentage: number;
};
export const CashNums = styled.div``;
export const CashBar = ({ edit, percentage, actualPercentage }: Props) => {
  if (!(typeof percentage === 'number')) {
    return <span>Loading</span>;
  }

  if (Math.round(percentage * 1000) / 1000 === -0) {
    percentage = Math.abs(percentage);
  }

  return (
    <Container>
      <BarsContainer>
        {!(actualPercentage === undefined) && (
          <BarActual>
            <Bar style={{ width: `${actualPercentage}%` }}> </Bar>
          </BarActual>
        )}
        <BarTarget>
          {percentage < 0 ? (
            <div style={{ width: '100%', backgroundColor: 'red' }}>
              Warning: cash allocation cannot be negative!
            </div>
          ) : (
            <Bar style={{ width: `${percentage}%` }}> </Bar>
          )}
        </BarTarget>
      </BarsContainer>
      <CashTargetRow>
        <Symbol>Cash</Symbol>
        {edit && (
          <React.Fragment>
            <Target>
              <Number value={percentage} />%
            </Target>
            <Actual>
              <Number value={actualPercentage} />%
            </Actual>
          </React.Fragment>
        )}
      </CashTargetRow>
    </Container>
  );
};

export default CashBar;
