import React from 'react';
import Number from './Number';

export const CashBar = (props) => {
  if (!(typeof(props.percentage) === "number")) {
    return 'Loading';
  }
  return (
    <div>
      <div>
        Cash
      </div>
      <div>
        <div>
          {
            props.percentage < 0 ? (
              <div style={{ width: '100%', backgroundColor: 'red' }}>
                Warning: cash allocation cannot be negative!
              </div>
            ) : (
              <div style={{ width: `${props.percentage > 100 ? 100 : props.percentage }%` }}>
                <Number value={props.percentage} />%
              </div>
            )
          }
        </div>
      </div>
      <div>
        <div>
          <Number value={props.percentage} />%
        </div>
        <div>
          <Number value={props.actualPercentage} />%
        </div>
        <div>
          <Number value={props.actualPercentage - props.percentage} />%
        </div>
      </div>
    </div>
  );
}

export default CashBar;
