import React from 'react';
import Number from './Number';
import { Table } from '../styled/GlobalElements';
import { BarsContainer, InputContainer, Symbol, Actual, Bar } from '../styled/Target';



export const CashBar = (props) => {
  if (!(typeof(props.percentage) === "number")) {
    return 'Loading';
  }
  return (
    <Table>
    <Symbol>Cash</Symbol>
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
      <InputContainer>
        <Number value={props.percentage} />%
      </InputContainer>
    </BarsContainer>
    <Actual>
      <Number value={props.actualPercentage} />%
    </Actual>
  </Table>
  );
}

export default CashBar;
