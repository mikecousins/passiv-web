import React from 'react';
import PropTypes from 'prop-types';

const AccountMetadata = (props) => (
  <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
    Account Name<br />
    {props.name}<br />
    {props.type}<br />
    {props.number}<br />
    {props.accurancy}%<br />
    ${props.cash}<br />
    ${props.equity}<br />
    ${props.excludedEquity}<br />
    ${props.cash + props.equity + props.excludedEquity}<br />
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
