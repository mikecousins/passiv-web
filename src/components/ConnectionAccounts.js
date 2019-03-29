import React from 'react';
import { connect } from 'react-redux';

import { selectAccounts } from '../selectors';
import { H3 } from '../styled/GlobalElements';

class ConnectionAccounts extends React.Component {
  selectAccountsByAuthorizationId = authorizationId => {
    let selectedAccounts = [];

    this.props.accounts.map(account => {
      if (account.brokerage_authorization === authorizationId) {
        selectedAccounts.push(account);
      }
      return null;
    });

    return selectedAccounts;
  };

  render() {
    const { authorizationId } = this.props;

    return (
      <div>
        <H3> This connection contains the following accounts: </H3>
        <div>
          {this.selectAccountsByAuthorizationId(authorizationId).map(
            account => (
              <div key={account.id}>
                {account.name} ({account.number})
              </div>
            ),
          )}
        </div>
      </div>
    );
  }
}

const select = state => ({
  accounts: selectAccounts(state),
});
const actions = {};

export default connect(
  select,
  actions,
)(ConnectionAccounts);
