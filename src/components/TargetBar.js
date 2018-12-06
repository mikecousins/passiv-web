import React from 'react';

const TargetBar = (props) => {
  const { edit } =  props;
  let percentage = <span>{props.percentage}</span>
  if (edit) {
    percentage = <input type="text" value={props.percentage} />;
  }
  return (
    <div>
      {props.symbol} - {percentage}%
    </div>
  );
}

export default TargetBar;
