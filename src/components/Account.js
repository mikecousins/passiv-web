import React from 'react';
import PropTypes from 'prop-types';

const Account = (props) => (
  <div className="flex py-2">
    <div className="w-1/4 bg-white py-1 align-middle">{props.account.meta.type} {props.account.number}</div>
    <div className="w-3/4 bg-white py-1 align-middle">
      <label>
      </label>
    </div>
  </div>
);

Account.defaultProps = {
  account: PropTypes.object,
}

export default Account;
