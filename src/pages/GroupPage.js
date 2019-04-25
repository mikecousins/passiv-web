import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { replace } from 'connected-react-router';
import PortfolioGroupAccuracy from '../components/PortfolioGroupAccuracy';
import PortfolioGroupHoldings from '../components/PortfolioGroupHoldings';
import PortfolioGroupMetadata from '../components/PortfolioGroupMetadata';
import PortfolioGroupTargets from '../components/PortfolioGroupTargets';
import AccountTrades from '../components/AccountTrades';
import PortfolioGroupSettings from '../components/PortfolioGroupSettings';
import AccountHoldings from '../components/AccountHoldings';
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
import {
  selectGroupsLoading,
  selectCurrentGroupAccountHoldings,
} from '../selectors/groups';
import Tooltip from '../components/Tooltip';
import { deleteData } from '../api';
import { initialLoad } from '../actions';

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
    reloadAllState,
    accounts,
  } = props;

  // if we don't have our group yet, show a spinner
  if (group === undefined) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  // if the group is null that means it's not found, redirect to the dashboard
  if (group === null) {
    return <Redirect to="/" />;
  }

  // see if we have any accounts in this group
  if (!group.accounts) {
    return (
      <span>
        There are no accounts in this group! &nbsp;
        <button
          onClick={() => {
            deleteData(`/api/v1/portfolioGroups/${group.id}`)
              .then(response => {
                reloadAllState();
                replace('/');
              })
              .catch(error => {
                reloadAllState();
                replace('/');
              });
          }}
        >
          Delete
        </button>
      </span>
    );
  }

  const name = group.name || 'No Name Provided';

  // see if we have any suggested trades to display
  let tradeDisplay = null;
  if (setupComplete && trades && trades.trades.length) {
    tradeDisplay = <AccountTrades trades={trades} groupId={group.id} />;
  }
  return (
    <React.Fragment>
      <Container2Column>
        <PortfolioGroupMetadata
          name={name}
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
      {accounts &&
        accounts.map(account => (
          <AccountHoldings account={account} key={account.number} />
        ))}
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
  accounts: selectCurrentGroupAccountHoldings(state),
});

const actions = {
  reloadAllState: initialLoad,
};

export default connect(
  select,
  actions,
)(GroupPage);
