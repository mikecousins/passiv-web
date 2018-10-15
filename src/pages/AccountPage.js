import React from 'react';
import { connect } from 'react-redux';
import { selectAccounts, selectBalances, selectPositions } from '../selectors';
import AccountMetadata from '../components/AccountMetadata';
import AccountTargets from '../components/AccountMetadata';
import AccountBalance from '../components/AccountMetadata';
import AccountHoldings from '../components/AccountMetadata';

const AccountPage = () => (
  <div>
    <AccountMetadata />
    <AccountTargets />
    <AccountBalance />
    <AccountHoldings />
  </div>
);

const select = state => ({
  accounts: selectAccounts(state),
  balances: selectBalances(state),
  positions: selectPositions(state),
});

export default connect(select)(AccountPage);
