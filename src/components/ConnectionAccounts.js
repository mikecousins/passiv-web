import React from 'react';
import { connect } from 'react-redux';
import { selectAccounts } from '../selectors/accounts';
import { H3, P } from '../styled/GlobalElements';

class ConnectionAccounts extends React.Component {
  render() {
    const { authorizationId } = this.props;

    return (
      <div>
        <H3> This connection contains the following accounts: </H3>
        <div>
          {this.props.accounts
            .filter(a => a.brokerage_authorization === authorizationId)
            .map(account => (
              <P key={account.id}>
                {account.name} ({account.number})
              </P>
            ))}
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
