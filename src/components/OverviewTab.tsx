import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import PortfolioGroupName from './PortfolioGroupDetails/PortfolioGroupName';
import PortfolioGroupAccuracy from './PortfolioGroupDetails/PortfolioGroupAccuracy';
import PortfolioGroupTotal from './PortfolioGroupDetails/PortfolioGroupTotal';
import PortfolioGroupCash from './PortfolioGroupDetails/PortfolioGroupCash';
import PortfolioGroupTargets from './PortfolioGroupTargets';
import PortfolioGroupTrades from './PortfolioGroupTrades';
import PortfolioGroupErrors from './PortfolioGroupErrors';
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
  selectGroupsLoading,
  selectCurrentGroupId,
} from '../selectors/groups';

export const Container3Column = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    > div {
      width: 32%;
      margin-right: 30px;
    }
    > div:last-of-type {
      margin-right: 0;
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

const OverviewTab = () => {
  const group = useSelector(selectCurrentGroup);
  const positions = useSelector(selectCurrentGroupPositions);
  const balances = useSelector(selectCurrentGroupBalances);
  const cash = useSelector(selectCurrentGroupCash);
  const equity = useSelector(selectCurrentGroupTotalEquity);
  const accuracy = useSelector(selectCurrentGroupAccuracy);
  const trades = useSelector(selectCurrentGroupTrades);
  const setupComplete = useSelector(selectCurrentGroupSetupComplete);
  const loading = useSelector(selectGroupsLoading);
  const error = useSelector(selectCurrentGroupInfoError);
  const groupId = useSelector(selectCurrentGroupId);
  const [tradeInProgress, setTradeInProgress] = useState(false);

  // reset our trade in progress flag when the group changes
  useEffect(() => {
    setTradeInProgress(false);
  }, [groupId]);

  // if we have trades set a trade in progress until it's over
  useEffect(() => {
    if (
      trades &&
      trades.trades &&
      trades.trades.length > 0 &&
      !tradeInProgress
    ) {
      setTradeInProgress(true);
    }
  }, [trades, tradeInProgress]);

  // if we don't have our group yet, show a spinner
  if (group === undefined) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  // if the group is null that means it's not found, redirect to the dashboard
  if (group === null) {
    return <Redirect to="/" />;
  }

  const name = group.name || 'No Name Provided';

  // see if we have any accounts in this group
  if (!group.accounts) {
    return (
      <React.Fragment>
        <PortfolioGroupName name={name} />
        <Container3Column>
          <PortfolioGroupAccuracy accuracy={null} loading={loading} />
          <PortfolioGroupCash />
          <PortfolioGroupTotal />
        </Container3Column>
      </React.Fragment>
    );
  }

  // see if we have any suggested trades to display
  let tradeDisplay = null;
  if (setupComplete && ((trades && trades.trades.length) || tradeInProgress)) {
    tradeDisplay = (
      <PortfolioGroupTrades
        trades={trades}
        groupId={group.id}
        onClose={() => setTradeInProgress(false)}
      />
    );
  }
  return (
    <React.Fragment>
      <PortfolioGroupName name={name} />
      <Container3Column>
        <PortfolioGroupAccuracy accuracy={accuracy} loading={loading} />
        <PortfolioGroupCash balances={balances} cash={cash} error={error} />
        <PortfolioGroupTotal equity={equity} error={error} />
      </Container3Column>

      {error ? <PortfolioGroupErrors error={error} /> : null}
      {tradeDisplay}

      <PortfolioGroupTargets />
    </React.Fragment>
  );
};

export default OverviewTab;
