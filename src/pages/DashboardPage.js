import React from 'react';
import { connect } from 'react-redux';
import Account from '../components/Account';
import { selectAccounts, selectBalances, selectPositions } from '../selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class DashboardPage extends React.Component {
  render() {
    let accounts = <FontAwesomeIcon icon={faSpinner} spin />;
    if (this.props.accounts && this.props.accounts.data) {
      accounts = this.props.accounts.data.map((account) => <Account account={account} key={account.number} balances={this.props.balances} positions={this.props.positions} />);
    }
    return (
      <React.Fragment>
        <div className="mb-4 text-xl font-bold">
          Dashboard
        </div>
        {accounts}
      </React.Fragment>
    );
  }
}

const select = state => ({
  accounts: selectAccounts(state),
  balances: selectBalances(state),
  positions: selectPositions(state),
});

export default connect(select)(DashboardPage);
