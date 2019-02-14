import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import AccountAccuracy from '../components/AccountAccuracy';
import AccountHoldings from '../components/AccountHoldings';
import AccountMetadata from '../components/AccountMetadata';
import AccountTargets from '../components/AccountTargets';
import AccountTrades from '../components/AccountTrades';
import AccountSettings from '../components/AccountSettings';
import { selectCurrentGroupTotalEquity, selectCurrentGroupCash, selectCurrentGroup, selectCurrentGroupAccuracy, selectCurrentGroupPositions, selectCurrentGroupBalances, selectCurrentGroupTrades } from '../selectors';
import styled from '@emotion/styled';

export const Container2Column = styled.div`
  display: flex;
  justify-content: space-between;
  > div:first-of-type {
    width: 75%;
    margin-right: 30px;
  }
  > div:last-of-type {
    width: 25%;
  }
`;

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
      <AccountTrades />
    )
  }
  return (
    <React.Fragment>
      {trades}
      <Container2Column>
        <AccountMetadata
          name={name}
          type={type}
          number={number}
          balances={props.balances}
          cash={props.cash}
          equity={props.equity}
        />
        <AccountAccuracy accuracy={props.accuracy} />
      </Container2Column>
      <AccountTargets positions={props.positions} />

      <Container2Column>
        <AccountHoldings positions={props.positions} />
        <AccountSettings />
      </Container2Column>
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
