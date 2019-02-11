import React from 'react';
import Number from './Number';
import { Table } from '../styled/GlobalElements';
import { BarsContainer, InputContainer, Symbol, Target, Actual, Bar, TargetRow, Container } from '../styled/Target';



export const CashBar = (props) => {
  if (!(typeof(props.percentage) === "number")) {
    return 'Loading';
  }
  return (
    <Container>
      <BarsContainer>
        {
          props.percentage < 0 ? (
            <div style={{ width: '100%', backgroundColor: 'red' }}>
              Warning: cash allocation cannot be negative!
            </div>
          ) : (
            <Bar style={{ width: `${props.percentage}%` }}> </Bar>
          )
        }
      </BarsContainer>
      <TargetRow>
        <Symbol>Cash</Symbol>
        <Target>
            <Number value={props.percentage} />%
        </Target>
        <Actual>
          <Number value={props.actualPercentage} />%
        </Actual>
      </TargetRow>
    </Container>
  );
}

export default CashBar;
