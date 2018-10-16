import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectAccounts, selectBalances, selectPositions } from '../selectors';
import AccountMetadata from '../components/AccountMetadata';
import AccountTargets from '../components/AccountMetadata';
import AccountBalance from '../components/AccountMetadata';
import AccountHoldings from '../components/AccountHoldings';

const AccountPage = (props) => {
  if (!props.accounts || !props.accounts.data || props.accounts.data.length === 0) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }
  const account = props.accounts.data.find(account => account.id = props.match.params.accountId);
  if (!account) {
    return <span>Account not found</span>;
  }
  const name = account.name || 'No Name Provided';
  const type = account.meta.type;
  const number = account.number;
  const accuracy = 0;
  let cash = 0;
  if (props.balances && props.balances.data) {
    props.balances.data.forEach(balance => cash += parseFloat(balance.cash))
  }
  let equity = 0;
  if (props.positions && props.positions.data) {
    props.positions.data.forEach(position => equity += (parseFloat(position.price) * position.units));
  }
  let excludedEquity = 0;
  return (
    <React.Fragment>
      <div class="flex mb-4">
        <div class="w-full">
          <AccountMetadata
            name={name}
            type={type}
            number={number}
            accuracy={accuracy}
            cash={cash}
            equity={equity}
            excludedEquity={excludedEquity}
          />
        </div>
      </div>

      <div class="flex mb-4">
        <div class="w-1/2">
          <AccountTargets />
        </div>
        <div class="w-1/2">
          <AccountBalance />
        </div>
      </div>

      <div class="flex mb-4">
        <div class="w-full">
          <AccountHoldings positions={props.positions.data} />
        </div>
      </div>
    </React.Fragment>
  );
}

const select = state => ({
  accounts: selectAccounts(state),
  balances: selectBalances(state),
  positions: selectPositions(state),
});

export default connect(select)(AccountPage);
