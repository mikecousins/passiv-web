import React from 'react';
import { connect } from 'react-redux';

import {
  selectBrokerages,
  selectAuthorizations,
  selectAccounts,
} from '../selectors';
import { initialLoad, loadBrokerages } from '../actions';

import Accounts from './Accounts';

import ShadowBox from '../styled/ShadowBox';
import { H2 } from '../styled/GlobalElements';

export class AccountsManager extends React.Component {
  render() {
    const { accounts } = this.props;

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
