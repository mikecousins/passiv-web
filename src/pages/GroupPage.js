import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectAccounts, selectBalances, selectPositions, selectFullGroups } from '../selectors';
import AccountMetadata from '../components/AccountMetadata';
import AccountTargets from '../components/AccountTargets';
import AccountBalance from '../components/AccountBalance';
import AccountHoldings from '../components/AccountHoldings';

const GroupPage = (props) => {
  if (!props.groups || props.groups.length === 0) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }
  const group = props.groups.find(group => group.id = props.match.params.groupId);
  if (!group) {
    return <span>Account not found</span>;
  }
  const name = group.name || 'No Name Provided';
  let type = null;
  let number = null;
  if (group.accounts && group.accounts[0]) {
    type = group.accounts[0].type;
    number = group.accounts[0].number;
  }
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
      <div className="flex mb-4">
        <div className="w-full">
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

      <div className="flex mb-4">
        <div className="w-1/2 mr-4">
          <AccountTargets />
        </div>
        <div className="w-1/2">
          <AccountBalance />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-full">
          <AccountHoldings positions={props.positions.data} />
        </div>
      </div>
    </React.Fragment>
  );
}

const select = state => ({
  groups: selectFullGroups(state),
  accounts: selectAccounts(state),
  balances: selectBalances(state),
  positions: selectPositions(state),
});

export default connect(select)(GroupPage);
