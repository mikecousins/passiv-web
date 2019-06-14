import React from 'react';

const Number = props => {
  let decimalPlaces = 1;
  if (props.decimalPlaces !== undefined) {
    decimalPlaces = props.decimalPlaces;
  }
  let prefix = null;
  if (props.currency) {
    prefix = '$';
    if (props.decimalPlaces === undefined) {
      if (!props.isTrade) {
        decimalPlaces = 2;
      } else {
        let defaultDecimalPlaces = 2;
        let actualDecimalPlaces = props.value.toString().split('.')[1].length;
        decimalPlaces = Math.max(defaultDecimalPlaces, actualDecimalPlaces);
      }
    }
  }
  let postfix = null;
  if (props.percentage) {
    postfix = '%';
  }
  if (props.forcePlusMinus) {
    if (props.value >= 0) {
      prefix = '+';
    }
  }
  return (
    <React.Fragment>
      {prefix}
      {new Intl.NumberFormat('en-CA', {
        maximumFractionDigits: decimalPlaces,
        minimumFractionDigits: decimalPlaces,
      }).format(props.value)}
      {postfix}
    </React.Fragment>
  );
};

export default Number;
