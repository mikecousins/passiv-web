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
  selectCurrentGroupTradesHasSkippedTrades,
  selectCurrentGroupPositionsNotInTarget,
  groupWithOnlyWealthicaAccount,
} from '../selectors/groups';
import { P } from '../styled/GlobalElements';
import Tour from './Tour/Tour';
import SecuritiesNotInTarget from './SecuritiesNotInTarget';

const TOUR_STEPS = [
  {
    target: '.tour-accuracy',
    content:
      'Accuracy tells you how close your holdings are to your desired target. 100% indicates your holdings are perfectly on target (including cash). Accuracy changes when you adjust your targets, your settings, and when you place trades. ',
    placement: 'right',
  },
  {
    target: '.tour-cash',
    content: 'All your available funds in your brokerage accounts’ currencies.',
    placement: 'right',
  },
  {
    target: '.tour-total-value',
    content:
      'Current total value of your holding plus your available cash. You can choose the currency Passiv displays your Total Value in.',
    placement: 'right',
  },
];

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
  const hasSkippedTrades = useSelector(
    selectCurrentGroupTradesHasSkippedTrades,
  );
  const positionsNotInTargets = useSelector(
    selectCurrentGroupPositionsNotInTarget,
  );
  const onlyWealthica = useSelector(groupWithOnlyWealthicaAccount);

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

  let skipErrorMessage = null;
  if (hasSkippedTrades === true && !onlyWealthica) {
    skipErrorMessage = <PortfolioGroupErrors error={{ code: 'SKIP_TRADES' }} />;
  }

  return (
    <React.Fragment>
      {setupComplete && <Tour steps={TOUR_STEPS} name="overview_tab_tour" />}
      <PortfolioGroupName name={name} />
      <Container3Column>
        <PortfolioGroupAccuracy
          accuracy={accuracy}
          loading={loading}
          tourClass="tour-accuracy"
        />
        <PortfolioGroupCash
          balances={balances}
          error={error}
          tourClass="tour-cash"
        />
        <PortfolioGroupTotal
          equity={equity}
          error={error}
          currency={preferredCurrency}
          tourClass="tour-total-value"
        />
      </Container3Column>

      {error ? <PortfolioGroupErrors error={error} /> : null}
      {setupComplete &&
        positionsNotInTargets &&
        positionsNotInTargets.length > 0 && (
          <SecuritiesNotInTarget targets={positionsNotInTargets} />
        )}
      {skipErrorMessage}
      {tradeDisplay}

      <PortfolioGroupTargets error={error} />
    </React.Fragment>
  );
};

export default OverviewTab;
