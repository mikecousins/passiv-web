import React from 'react';

const TargetBar = (props) => (
  <div>
    {props.symbol} - {props.children}%
  </div>
);

export default TargetBar;
