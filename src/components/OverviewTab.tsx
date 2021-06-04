import {
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  selectPreferredCurrency,
  selectCurrentGroupPositionsNotInTargetOrExcluded,
  selectCurrentGroupModelType,
  selectNeedToPrioritize,
  selectGroupsLoading,
} from '../selectors/groups';
import { H3, P } from '../styled/GlobalElements';
import Tour from './Tour/Tour';
import { OverviewTabSteps } from './Tour/TourSteps';
import NewAssetsDetected from './NewAssetsDetected';
import { ErrorContainer } from '../styled/Group';
import { Button } from '../styled/Button';
import { postData } from '../api';
import { toast } from 'react-toastify';
import { loadGroupInfo } from '../actions';
import { push } from 'connected-react-router';

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

const List = styled.ul`
  margin: 20px;
  list-style: circle;
  > li {
    margin-bottom: 5px;
  }
`;

const Description = styled(P)`
  font-size: 20px;
`;

const OverviewTab = () => {
  const dispatch = useDispatch();

  const group = useSelector(selectCurrentGroup);
  const currentGroupModelType = useSelector(selectCurrentGroupModelType);
  const balances = useSelector(selectCurrentGroupBalances);
  const equity = useSelector(selectCurrentGroupTotalEquity);
  const accuracy = useSelector(selectCurrentGroupAccuracy);
  const trades = useSelector(selectCurrentGroupTrades);
  const setupComplete = useSelector(selectCurrentGroupSetupComplete);
  const loading = useSelector(selectGroupsLoading);
  const error = useSelector(selectCurrentGroupInfoError);
  const preferredCurrency = useSelector(selectPreferredCurrency);
  const positionsNotInTargetsOrExcluded = useSelector(
    selectCurrentGroupPositionsNotInTargetOrExcluded,
  );
  const needToPrioritize = useSelector(selectNeedToPrioritize);
  const positionsNotInTarget = positionsNotInTargetsOrExcluded?.filter(
    (position) => !position.excluded,
  );

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
          <Link to={`/settings#accounts`}>Manage Groups</Link>
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

  const handleTakeToPriorities = () => {
    const modelId = group.model_portfolio;
    postData(`api/v1/portfolioGroups/${group.id}/modelPortfolio/${modelId}`, {})
      .then(() => {
        dispatch(loadGroupInfo());
        dispatch(push(`/priorities/${group.id}`));
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.detail);
        }
      });
  };

  return (
    <React.Fragment>
      {setupComplete && (
        <Tour steps={OverviewTabSteps} name="overview_tab_tour" />
      )}
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
      {needToPrioritize && (
        <ErrorContainer>
          <H3>
            <FontAwesomeIcon icon={faExclamationTriangle} /> Need to confirm
            priorities
          </H3>
          <Description>
            We noticed that you made changes to the asset class model used by
            this group. In order to show you accurate trades, Passiv needs you
            to confirm priorities for this model.
          </Description>
          <br />
          <P>
            <span style={{ fontWeight: 600 }}>Prioritization</span> needs to be
            confirmed after doing any of the following actions:
            <List>
              <li>Adding or Deleting a security in an asset class.</li>
              <li>Adding an account to the portfolio group.</li>
              <li>
                Adding an asset class to the model portfolio linked to a
                portfolio group.
              </li>
            </List>
          </P>

          <Button onClick={handleTakeToPriorities}>
            Reapply & Reprioritize
          </Button>
        </ErrorContainer>
      )}
      {setupComplete &&
        positionsNotInTarget &&
        positionsNotInTarget.length > 0 &&
        currentGroupModelType !== 1 && (
          <NewAssetsDetected targets={positionsNotInTarget} />
        )}
      {tradeDisplay}

      <PortfolioGroupTargets error={error} />
    </React.Fragment>
  );
};

export default OverviewTab;
