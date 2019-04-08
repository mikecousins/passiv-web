import React from 'react';
import { connect } from 'react-redux';
import { selectAccounts } from '../selectors';
import Account from './Accounts';

export const Accounts = ({ accounts }) => {
  if (!accounts || accounts.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      {accounts.map(account => (
        <Account key={account.id} account={account} />
      ))}
    </React.Fragment>
  );
};

const select = state => ({
  accounts: selectAccounts(state),
});

export default connect(select)(Accounts);
