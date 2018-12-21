import React from 'react';

export const TargetBar = (props) => {
  if (!props.positions) {
    return 'Loading';
  }
  const actualPercentage = props.positions.find(position => position.symbol.symbol === props.symbol).percentage || 25;
  let deltaClassName = "w-1/3 text-blue";
  let progressClassName = "bg-blue text-xs leading-none py-1 text-center text-white";
  if ((actualPercentage - props.percentage) < 0) {
    deltaClassName = "w-1/3 text-red";
    progressClassName = "bg-red text-xs leading-none py-1 text-center text-white";
  }
  return (
    <div className="flex w-full">
      <div className="w-1/6">
        {props.symbol}
      </div>
      <div className="w-1/2">
        <div className="shadow w-full bg-grey-light">
          <div className={progressClassName} style={{ width: `${props.percentage}%` }}>
            {props.percentage}%
          </div>
        </div>
      </div>
      <div className="flex w-1/3">
        <div className="w-1/3">
          {props.children}%
        </div>
        <div className="w-1/3">
          {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(actualPercentage)}%
        </div>
        <div className={deltaClassName}>
          {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1 }).format(actualPercentage - props.percentage)}%
        </div>
      </div>
    </div>
  );
}

export default TargetBar;
