import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AccountMetadata = (props) => (
  <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
    <div className="border-grey-lighter border-b py-2 flex w-full">
      <div className="w-2/3 text-4xl font-bold">
        {props.name ? props.name : <FontAwesomeIcon icon={faSpinner} spin />}
      </div>
      <div className="w-1/6 text-center">
        <h3>Type</h3>
        {props.type ? props.type : <FontAwesomeIcon icon={faSpinner} spin />}
      </div>
      <div className="w-1/6 text-center">
        <h3>Account #</h3>
        {props.number ? props.number : <FontAwesomeIcon icon={faSpinner} spin />}
      </div>
    </div>
    <div className="py-2 flex w-full">
      <div className="w-1/5 border-grey-lighter border-r px-2 text-center">
        <h3>Accuracy</h3>
        {props.accuracy ? <span>{props.accuracy}%</span> : <FontAwesomeIcon icon={faSpinner} spin />}
      </div>
      <div className="w-1/5 px-2 text-center">
        <h3>Cash</h3>
        {props.cash ? new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(props.cash) : <FontAwesomeIcon icon={faSpinner} spin />}
      </div>
      <div className="w-1/5 px-2 text-center">
        <h3>Equity</h3>
        {props.equity ? new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(props.equity) : <FontAwesomeIcon icon={faSpinner} spin />}
      </div>
      <div className="w-1/5 px-2 text-center">
        <h3>Excluded</h3>
        {props.excludedEquity ? new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(props.excludedEquity) : <FontAwesomeIcon icon={faSpinner} spin />}
      </div>
      <div className="w-1/5 px-2 text-center">
        <h3>Total Value</h3>
        <b>{props.total ? new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(props.cash + props.equity + props.excludedEquity) : <FontAwesomeIcon icon={faSpinner} spin />}</b>
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
