import React from 'react';
import { connect } from 'react-redux';
import { selectAccounts } from '../selectors/accounts';
import { H3, P } from '../styled/GlobalElements';

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
              <P key={account.id}>
                {account.name} ({account.number})
              </P>
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
