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
  Container,
  CashTargetRow,
} from '../../styled/Target';
import Tooltip from '../Tooltip';

type Props = {
  edit: boolean;
  percentage: number;
  actualPercentage: number;
};
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
      <CashTargetRow editing={edit}>
        <Symbol>Cash</Symbol>
        <React.Fragment>
          <Target>
            <Tooltip label={percentage.toString()}>
              <div>
                <Number value={percentage} />%
              </div>
            </Tooltip>
          </Target>
          <Actual>
            <Tooltip label={actualPercentage.toString()}>
              <div>
                <Number value={actualPercentage} />%
              </div>
            </Tooltip>
          </Actual>
        </React.Fragment>
      </CashTargetRow>
    </Container>
  );
};

export default CashBar;
