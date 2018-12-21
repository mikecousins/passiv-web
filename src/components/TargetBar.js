import React from 'react';

export const TargetBar = (props) => {
  let deltaClassName = "w-1/3 text-blue";
  if ((props.actualPercentage - props.percentage) < 0) {
    deltaClassName = "w-1/3 text-red";
  }
  return (
    <div className="flex w-full">
      <div className="w-1/6">
        {props.symbol}
      </div>
      <div className="w-1/2">
        <div className="shadow w-full bg-grey-light">
          <div className="bg-blue text-xs leading-none py-1 text-center text-white" style={{ width: `${props.percentage}%` }}>
            {props.percentage}%
          </div>
        </div>
      </div>
      <div className="flex w-1/3">
        <div className="w-1/3">
          {props.children}%
        </div>
        <div className="w-1/3">
          {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(props.actualPercentage)}%
        </div>
        <div className={deltaClassName}>
          {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1 }).format(props.actualPercentage - props.percentage)}%
        </div>
      </div>
    </div>
  );
}

export default TargetBar;
