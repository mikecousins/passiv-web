import React from 'react';
import Number from '../Number';
import {
  BarsContainer,
  Symbol,
  Target,
  Actual,
  Bar,
  BarTarget,
  BarActual,
  TargetRow,
  Container,
} from '../../styled/Target';

type Props = {
  percentage: number;
  actualPercentage: number;
};

export const CashBar = ({ percentage, actualPercentage }: Props) => {
  if (!(typeof percentage === 'number')) {
    return 'Loading';
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
      <TargetRow>
        <Symbol>Cash</Symbol>
        <Target>
          <Number value={percentage} />%
        </Target>
        <Actual>
          <Number value={actualPercentage} />%
        </Actual>
      </TargetRow>
    </Container>
  );
};

export default CashBar;
