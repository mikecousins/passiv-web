import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectAccounts } from '../selectors';

const SideBar = (props) => {
  let accounts = <FontAwesomeIcon icon={faSpinner} spin />;
  if (props.accounts && props.accounts.data) {
    accounts = props.accounts.data.map((account) => <Link to="/account" className="block text-white no-underline text-lg tracking-wide pl-10 py-2" key={account.number}>{account.number}</Link>);
  }
  return (
    <div>
      <Link to="/dashboard" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Dashboard</Link>
      {accounts}
    </div>
  );
}

const select = state => ({
  accounts: selectAccounts(state),
});

export default connect(select)(SideBar);
