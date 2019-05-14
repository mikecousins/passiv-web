import React from 'react';
import { connect } from 'react-redux';

import { selectBrokerages, selectAuthorizations } from '../selectors';
import { selectAccounts } from '../selectors/accounts';
import { initialLoad, loadBrokerages } from '../actions';

import Accounts from './Accounts';

import ShadowBox from '../styled/ShadowBox';
import { H2 } from '../styled/GlobalElements';

export class AccountsManager extends React.Component {
  render() {
    const { accounts, authorizations } = this.props;

    if (!authorizations) {
      return null;
    } else if (authorizations.length === 0) {
      return null;
    }

    return (
      <ShadowBox>
        <H2>Accounts</H2>
        <Accounts accounts={accounts} />
      </ShadowBox>
    );
  }
}

const select = state => ({
  brokerages: selectBrokerages(state),
  authorizations: selectAuthorizations(state),
  accounts: selectAccounts(state),
});

const actions = {
  reloadAllState: initialLoad,
  reloadBrokerages: loadBrokerages,
};

export default connect(
  select,
  actions,
)(AccountsManager);
