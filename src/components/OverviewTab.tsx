import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
  selectCurrentGroup,
  selectCurrentGroupAccuracy,
  selectCurrentGroupBalances,
  selectCurrentGroupTrades,
  selectCurrentGroupInfoError,
  selectCurrentGroupSetupComplete,
  selectGroupsLoading,
  selectPreferredCurrency,
} from '../selectors/groups';
import { P } from '../styled/GlobalElements';

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
  const balances = useSelector(selectCurrentGroupBalances);
  const equity = useSelector(selectCurrentGroupTotalEquity);
  const accuracy = useSelector(selectCurrentGroupAccuracy);
  const trades = useSelector(selectCurrentGroupTrades);
  const setupComplete = useSelector(selectCurrentGroupSetupComplete);
  const loading = useSelector(selectGroupsLoading);
  const error = useSelector(selectCurrentGroupInfoError);
  const preferredCurrency = useSelector(selectPreferredCurrency);

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
  if (!group.hasAccounts) {
    return (
      <React.Fragment>
        <PortfolioGroupName name={name} />
        <P>
          There are no accounts in this group.{' '}
          <Link to={`/app/settings#accounts`}>Manage Groups</Link>
        </P>
      </React.Fragment>
    );
  }

  // see if we have any suggested trades to display
  let tradeDisplay = null;
  if (setupComplete === true) {
    tradeDisplay = (
      <PortfolioGroupTrades trades={trades} groupId={group.id} error={error} />
    );
  }
  return (
    <React.Fragment>
      <PortfolioGroupName name={name} />
      <Container3Column>
        <PortfolioGroupAccuracy accuracy={accuracy} loading={loading} />
        <PortfolioGroupCash balances={balances} error={error} />
        <PortfolioGroupTotal
          equity={equity}
          error={error}
          currency={preferredCurrency}
        />
      </Container3Column>

      {error ? <PortfolioGroupErrors error={error} /> : null}
      {tradeDisplay}

      <PortfolioGroupTargets error={error} />
    </React.Fragment>
  );
};

export default OverviewTab;
