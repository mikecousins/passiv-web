import React from 'react';
import Number from './Number';
import { Table } from '../styled/GlobalElements';
import { BarContainer, InputContainer, Symbol, Actual, Delta, Bar } from '../styled/Target';


export const CashBar = (props) => {
  if (!(typeof(props.percentage) === "number")) {
    return 'Loading';
  }
  return (
    <Table>
    <Symbol>Cash</Symbol>
    <BarContainer>
      {
        props.percentage < 0 ? (
          <div style={{ width: '100%', backgroundColor: 'red' }}>
            Warning: cash allocation cannot be negative!
          </div>
        ) : (
          <Bar style={{ width: `${props.percentage}%` }}> </Bar>
        )
      }
      <InputContainer>
        <Number value={props.percentage} />%
      </InputContainer>
    </BarContainer>
    <Actual>
      <Number value={props.actualPercentage} />%
    </Actual>
    <Delta>
      <Number value={props.actualPercentage - props.percentage} />%
    </Delta>
  </Table>
  );
}

export default CashBar;
