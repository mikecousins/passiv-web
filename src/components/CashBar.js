import React from 'react';

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
                {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(props.percentage)}%
              </div>
            )
          }
        </div>
      </div>
      <div>
        <div>
          {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(props.percentage)}%
        </div>
        <div>
          {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(props.actualPercentage)}%
        </div>
        <div>
          {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(props.actualPercentage - props.percentage)}%
        </div>
      </div>
    </div>
  );
}

export default CashBar;
