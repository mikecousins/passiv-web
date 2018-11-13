import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  selectCurrentGroup,
  selectCurrentPositions,
  selectCurrentCash,
  selectCurrentBalancedEquity,
  selectCurrentTarget
} from '../selectors';
import AccountMetadata from '../components/AccountMetadata';
import AccountTargets from '../components/AccountTargets';
import AccountBalance from '../components/AccountBalance';
import AccountHoldings from '../components/AccountHoldings';

const GroupPage = (props) => {
  const { group } = props;
  if (!props.group) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  const name = group.name || 'No Name Provided';
  let type = null;
  let number = null;
  const accuracy = 0;
  let excludedEquity = 0;

  if (group.accounts && group.accounts[0]) {
    type = group.accounts[0].type;
    number = group.accounts[0].number;
  }
  return (
    <React.Fragment>
      <div className="flex mb-4">
        <div className="w-full">
          <AccountMetadata
            name={name}
            type={type}
            number={number}
            accuracy={accuracy}
            cash={props.cash}
            equity={props.balancedEquity}
            excludedEquity={excludedEquity}
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/2 mr-4">
          <AccountTargets target={props.target} />
        </div>
        <div className="w-1/2">
          <AccountBalance />
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
  positions: selectCurrentPositions(state),
  cash: selectCurrentCash(state),
  balancedEquity: selectCurrentBalancedEquity(state),
  targets: selectCurrentTarget(state),
});

export default connect(select)(GroupPage);
