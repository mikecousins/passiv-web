import React from 'react';

type Props = {
  decimalPlaces?: number;
  currency?: string | null;
  percentage?: boolean;
  isTrade?: boolean;
  forcePlusMinus?: boolean;
  value: number;
};

const Number = (props: Props) => {
  let decimalPlaces = 1;
  if (props.decimalPlaces !== undefined) {
    decimalPlaces = props.decimalPlaces;
  }
  let language = 'en-US';
  if (typeof window !== 'undefined') {
    language = navigator.language;
  }
  let prefix = null;
  if (props.currency !== undefined && props.currency !== null) {
    if (props.decimalPlaces === undefined) {
      if (!props.isTrade) {
        decimalPlaces = 2;
      } else {
        let defaultDecimalPlaces = 2;
        let pieces = props.value.toString().split('.');
        let actualDecimalPlaces = 0;
        if (pieces.length > 1) {
          actualDecimalPlaces = pieces[1].length;
        }
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
  let numberProps: {
    maximumFractionDigits: number;
    minimumFractionDigits: number;
    currency?: string;
    style?: string;
    currencyDisplay?: string;
  } = {
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: decimalPlaces,
  };
  if (props.currency !== undefined && props.currency !== null) {
    numberProps.style = 'currency';
    numberProps.currencyDisplay = 'symbol';
    numberProps.currency = props.currency;
  }
  return (
    <React.Fragment>
      {prefix}
      {new Intl.NumberFormat(language, numberProps).format(props.value)}
      {postfix}
    </React.Fragment>
  );
};

export default Number;
