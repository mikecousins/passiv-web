import React from 'react';

const Number = (props) => {
  let decimalPlaces = props.decimalPlaces || 1;
  let prefix = null;
  if (props.currency) {
    prefix = '$';
    if (!props.decimalPlaces) {
      decimalPlaces = 2;
    }
  }
  let postfix = null;
  if (props.percentage) {
    postfix = '%';
  }
  if (props.forcePlusMinus) {

  }
  return (
    <React.Fragment>
      {prefix}
      {new Intl.NumberFormat('en-CA', { maximumFractionDigits: decimalPlaces, minimumFractionDigits: decimalPlaces }).format(props.value)}
      {postfix}
    </React.Fragment>
  );
}

export default Number;
