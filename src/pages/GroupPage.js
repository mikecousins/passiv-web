import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import AccountBalance from '../components/AccountBalance';
import AccountHoldings from '../components/AccountHoldings';
import AccountMetadata from '../components/AccountMetadata';
import AccountTargets from '../components/AccountTargets';
import AccountTrades from '../components/AccountTrades';
import { selectCurrentGroupTotalEquity, selectCurrentGroupCash, selectCurrentGroup, selectCurrentGroupAccuracy, selectCurrentGroupPositions, selectCurrentGroupBalances, selectCurrentGroupTrades } from '../selectors';

const GroupPage = (props) => {
  const { group } = props;
  if (!props.group) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  const name = group.name || 'No Name Provided';
  let type = null;
  let number = null;

  if (group.accounts && group.accounts[0]) {
    type = group.accounts[0].type;
    number = group.accounts[0].number;
  }

  let trades = null;
  if (props.trades && props.trades.trades.length) {
    trades = (
      <div className="flex mb-4">
        <div className="w-full">
          <AccountTrades />
        </div>
      </div>
    )
  }
  return (
    <React.Fragment>
      {trades}
      <div className="flex mb-4">
        <div className="w-full">
          <AccountMetadata
            name={name}
            type={type}
            number={number}
            accuracy={props.accuracy}
            cash={props.cash}
            equity={props.equity}
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-full">
          <AccountTargets />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-full">
          <AccountBalance balances={props.balances} />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-full">
          <AccountHoldings positions={props.positions} />
        </div>
      </div>
    </React.Fragment>
  );
}

const select = state => ({
  group: selectCurrentGroup(state),
  positions: selectCurrentGroupPositions(state),
  balances: selectCurrentGroupBalances(state),
  cash: selectCurrentGroupCash(state),
  equity: selectCurrentGroupTotalEquity(state),
  accuracy: selectCurrentGroupAccuracy(state),
  trades: selectCurrentGroupTrades(state),
});

export default connect(select)(GroupPage);
