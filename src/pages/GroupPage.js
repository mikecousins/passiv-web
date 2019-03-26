import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AccountAccuracy from '../components/AccountAccuracy';
import AccountHoldings from '../components/AccountHoldings';
import AccountMetadata from '../components/AccountMetadata';
import AccountTargets from '../components/AccountTargets';
import AccountTrades from '../components/AccountTrades';
import AccountSettings from '../components/AccountSettings';
import { selectCurrentGroupTotalEquity, selectCurrentGroupCash, selectCurrentGroup, selectCurrentGroupAccuracy, selectCurrentGroupPositions, selectCurrentGroupBalances, selectCurrentGroupTrades, selectCurrentGroupSetupComplete } from '../selectors';
import styled from '@emotion/styled';

export const Container2Column = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    > div:first-of-type {
      width: 75%;
      margin-right: 30px;
    }
    > div:last-of-type {
      width: 25%;
    }
  }
`;

const GroupPage = (props) => {
  const { group, trades, balances, accuracy, positions, cash, equity, setupComplete } = props;

  // if we don't have our group yet, show a spinner
  if (group === undefined) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  // if the group is null that means it's not found, redirect to the dashboard
  if (group === null) {
    return <Redirect to="/" />;
  }

  const name = group.name || 'No Name Provided';
  let type = null;
  let number = null;

  // grab the account type and number from the first account
  // TODO fix this when we support groups properly
  if (group.accounts && group.accounts[0]) {
    type = group.accounts[0].type;
    number = group.accounts[0].number;
  }

  // see if we have any suggested trades to display
  let tradeDisplay = null;
  if (setupComplete && trades && trades.trades.length) {
    tradeDisplay = (
      <AccountTrades trades={trades} groupId={group.id} />
    )
  }
  return (
    <React.Fragment>
      <Container2Column>
        <AccountMetadata
          name={name}
          type={type}
          number={number}
          balances={balances}
          cash={cash}
          equity={equity}
        />
        <AccountAccuracy accuracy={accuracy} />
      </Container2Column>

      {tradeDisplay}

      <AccountTargets positions={positions} />

      <Container2Column>
        <AccountHoldings positions={positions} />
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
  setupComplete: selectCurrentGroupSetupComplete(state),
});

export default connect(select)(GroupPage);
