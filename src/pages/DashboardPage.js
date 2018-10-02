import React from 'react';
import { connect } from 'react-redux';
import Account from '../components/Account';
import { selectAccounts } from '../selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class DashboardPage extends React.Component {
  render() {
    let accounts = <FontAwesomeIcon icon={faSpinner} spin />;
    if (this.props.accounts && this.props.accounts.data) {
      accounts = this.props.accounts.data.map((account) => <Account account={account} key={account.number} />);
    }
    return (
      <div>
        <div className="mb-4 text-xl font-bold">
          Dashboard
        </div>
        {accounts}
      </div>
    );
  }
}

const select = state => ({
  accounts: selectAccounts(state),
});

export default connect(select)(DashboardPage);
