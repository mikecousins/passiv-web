import React from 'react';
import PropTypes from 'prop-types';

const AccountMetadata = (props) => (
  <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
    <div className="border-grey-lighter border-b py-2 flex w-full">
      <div className="w-2/3 text-4xl font-bold">
        **Account Name**
      </div>
      <div className="w-1/6 text-center">
        <h3>Type</h3>
        {props.type}
      </div>
      <div className="w-1/6 text-center">
        <h3>Account #</h3>
        {props.number}
      </div>
    </div>
    <div className="py-2 flex w-full">
      <div className="w-1/5 border-grey-lighter border-r px-2 text-center">
        <h3>Accuracy</h3>
        {props.accuracy}%
      </div>
      <div className="w-1/5 px-2 text-center">
        <h3>Cash</h3>
        {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(props.cash)}
      </div>
      <div className="w-1/5 px-2 text-center">
        <h3>Equity</h3>
        {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(props.equity)}
      </div>
      <div className="w-1/5 px-2 text-center">
        <h3>Excluded</h3>
        {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(props.excludedEquity)}
      </div>
      <div className="w-1/5 px-2 text-center">
        <h3>Total Value</h3>
        <b>{new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(props.cash + props.equity + props.excludedEquity)}</b>
      </div>
    </div>
  </div>
);

AccountMetadata.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  number: PropTypes.string,
  accuracy: PropTypes.number,
  cash: PropTypes.number,
  equity: PropTypes.number,
  excludedEquity: PropTypes.number,
};

export default AccountMetadata;
