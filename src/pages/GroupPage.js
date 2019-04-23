import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import PortfolioGroupAccuracy from '../components/PortfolioGroupAccuracy';
import PortfolioGroupHoldings from '../components/PortfolioGroupHoldings';
import AccountMetadata from '../components/AccountMetadata';
import PortfolioGroupTargets from '../components/PortfolioGroupTargets';
import AccountTrades from '../components/AccountTrades';
import PortfolioGroupSettings from '../components/PortfolioGroupSettings';
import {
  selectCurrentGroupTotalEquity,
  selectCurrentGroupCash,
  selectCurrentGroup,
  selectCurrentGroupAccuracy,
  selectCurrentGroupPositions,
  selectCurrentGroupBalances,
  selectCurrentGroupTrades,
  selectCurrentGroupSetupComplete,
} from '../selectors';
import { selectGroupsLoading } from '../selectors/groups';
import Tooltip from '../components/Tooltip';

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

const GroupPage = props => {
  const {
    group,
    trades,
    balances,
    accuracy,
    positions,
    cash,
    equity,
    setupComplete,
    loading,
  } = props;

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
    tradeDisplay = <AccountTrades trades={trades} groupId={group.id} />;
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
        <PortfolioGroupAccuracy accuracy={accuracy} loading={loading} />
      </Container2Column>

      {tradeDisplay}

      <PortfolioGroupTargets positions={positions} />

      <Container2Column>
        <PortfolioGroupHoldings positions={positions} loading={loading} />
        <PortfolioGroupSettings />
      </Container2Column>
      <Tooltip />
    </React.Fragment>
  );
};

const select = state => ({
  group: selectCurrentGroup(state),
  positions: selectCurrentGroupPositions(state),
  balances: selectCurrentGroupBalances(state),
  cash: selectCurrentGroupCash(state),
  equity: selectCurrentGroupTotalEquity(state),
  accuracy: selectCurrentGroupAccuracy(state),
  trades: selectCurrentGroupTrades(state),
  setupComplete: selectCurrentGroupSetupComplete(state),
  loading: selectGroupsLoading(state),
});

export default connect(select)(GroupPage);
