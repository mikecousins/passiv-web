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
import PortfolioGroupTrades from '../components/PortfolioGroupTrades';
import PortfolioGroupSettings from '../components/PortfolioGroupSettings';
import PortfolioGroupAccounts from '../components/PortfolioGroupAccounts';
import PortfolioGroupErrors from '../components/PortfolioGroupErrors';
import {
  selectCurrentGroupTotalEquity,
  selectCurrentGroupCash,
  selectCurrentGroup,
  selectCurrentGroupAccuracy,
  selectCurrentGroupPositions,
  selectCurrentGroupBalances,
  selectCurrentGroupTrades,
  selectCurrentGroupInfoError,
  selectCurrentGroupSetupComplete,
} from '../selectors/groups';
import {
  selectGroupsLoading,
  selectCurrentGroupAccountHoldings,
} from '../selectors/groups';
import Tooltip from '../components/Tooltip';
import { deleteData } from '../api';
import { initialLoad } from '../actions';
import { Button } from '../styled/Button';

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

export const Container6040Column = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    > div:first-of-type {
      width: 60%;
      margin-right: 30px;
    }
    > div:last-of-type {
      width: 40%;
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
    error,
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
        <Button
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
        </Button>
      </span>
    );
  }

  const name = group.name || 'No Name Provided';

  // see if we have any suggested trades to display
  let tradeDisplay = null;
  if (setupComplete && trades && trades.trades.length) {
    tradeDisplay = <PortfolioGroupTrades trades={trades} groupId={group.id} />;
  }
  return (
    <React.Fragment>
      <Container2Column>
        <PortfolioGroupMetadata
          name={name}
          balances={balances}
          cash={cash}
          equity={equity}
          error={error}
          accounts={accounts}
        />
        <PortfolioGroupAccuracy accuracy={accuracy} loading={loading} />
      </Container2Column>

      {error ? <PortfolioGroupErrors error={error} /> : null}
      {tradeDisplay}

      <PortfolioGroupTargets positions={positions} />

      <Container6040Column>
        <PortfolioGroupHoldings positions={positions} loading={loading} />
        <PortfolioGroupSettings />
      </Container6040Column>

      <PortfolioGroupAccounts
        group={group}
        accounts={accounts}
        loading={loading}
        error={error}
      />

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
  error: selectCurrentGroupInfoError(state),
});

const actions = {
  reloadAllState: initialLoad,
};

export default connect(
  select,
  actions,
)(GroupPage);
