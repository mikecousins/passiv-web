import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectAccounts } from '../selectors';
import { toggleDemoMode } from '../actions';

const SideBar = (props) => {
  let accounts = <FontAwesomeIcon icon={faSpinner} spin />;
  if (props.accounts && props.accounts.data && props.accounts.data.length > 0) {
    accounts = props.accounts.data.map((account) => (
      <Link
        to={`/account/${account.id}`}
        className="block text-white no-underline text-lg tracking-wide pl-10 py-2"
        key={account.number}
      >
        {account.number}
      </Link>
    ));
  }
  return (
    <div>
      <Link to="/dashboard" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Dashboard</Link>
      {accounts}
      <Link to="/settings" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Settings</Link>
      <button onClick={props.toggleDemo} className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Demo</button>
    </div>
  );
}

const select = state => ({
  accounts: selectAccounts(state),
});

const actions = { toggleDemo: toggleDemoMode };

export default connect(select, actions)(SideBar);
