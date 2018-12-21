import React from 'react';

const TargetBar = (props) => (
  <div className="flex w-full">
    <div className="w-1/6">
      {props.symbol}
    </div>
    <div className="w-1/2">
      <div className="shadow w-full bg-grey-light">
        <div className="bg-blue text-xs leading-none py-1 text-center text-white" style={{ width: '25%' }}>25%</div>
      </div>
    </div>
    <div className="flex w-1/3">
      <div className="w-1/3">
        {props.children}%
      </div>
      <div className="w-1/3">
        28%
      </div>
      <div className="w-1/3 text-red">
        -2%
      </div>
    </div>
  </div>
);

export default TargetBar;
