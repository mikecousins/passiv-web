import React from 'react';

const Number = (props) => (
  <React.Fragment>
    {new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(props.value)}
  </React.Fragment>
);

export default Number;
