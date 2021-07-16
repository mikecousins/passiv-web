import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGoals } from '../../selectors/goals';
import { P, H1 } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import { Goal } from '../../types/goals';
import GoalSetup from './GoalSetup';
import GoalsList from './GoalsList';
import { Button } from '../../styled/Button';

const HeaderBanner = styled(Grid)`
  align-items: center;
  margin-bottom: 30px;
  h1 {
    margin-bottom: 10px;
    line-height: 1;
  }
  p {
    margin-bottom: 0;
    span {
      font-weight: 700;
      font-size: 14px;
      margin-left: 5px;
      display: inline-block;
    }
  }
`;

const AddGoalButton = styled(Button)`
  margin: 0 0 0px auto;
  display: block;
  padding: 12px 24px 18px;
  font-size: 1.2rem;
  @media (max-width: 900px) {
    margin: 20px 0 0 0;
  }
  span {
    font-weight: 900;
    margin-right: 5px;
    font-size: 1.6rem;
    display: inline-block;
  }
  &.noGoalsMade {
    font-size: 2.5rem;
    margin: 20px auto 50px;
  }
`;

export const MockGoal: Goal = {
  id: 'mockgoal',
  title: 'Mock Goal',
  created_date: '2020-10-16',
  target_date: '2024-01-01',
  total_value_target: 50000,
  contribution_frequency: 'monthly',
  contribution_target: 1000,
  average_monthly_contributions: 1100,
  projected_gain_by_end_date: 12000,
  completed: false,
  portfolio_group: null,
  return_rate: 0,
  contribution_streak: 4,
  display_on_dashboard: false,
};

const Goals = () => {
  const [currentMode, setCurrentMode] = useState('view');
  let goalsSelect: Goal[] | null = [];
  goalsSelect = useSelector(selectGoals).data;
  let goals: Goal[] | null;
  if (goalsSelect !== undefined && goalsSelect !== null) {
    goals = goalsSelect;
  } else {
    goals = [];
  }

  let goalsClass = 'goalsExist';
  if (goals !== null && goals !== undefined) {
    if (goals?.length === 0) {
      goalsClass = 'noGoalsMade';
      if (currentMode === 'view') {
        setCurrentMode('add');
      }
    }
  }

  return (
    <React.Fragment>
      {(currentMode === 'view' || currentMode === 'finishedSetup') && (
        <HeaderBanner columns="1fr auto">
          <div>
            <H1>Goals</H1>
            <P>
              “Success is the progressive realization of a worthwhile goal.”{' '}
              <span>Earl Nightingale</span>
            </P>
          </div>
          <div>
            <AddGoalButton
              onClick={() => setCurrentMode('add')}
              className={goalsClass}
            >
              <span>+</span>Add Goal{' '}
            </AddGoalButton>
          </div>
        </HeaderBanner>
      )}
      {currentMode === 'add' && <GoalSetup setGoalMode={setCurrentMode} />}
      {(currentMode === 'view' || currentMode === 'finishedSetup') && (
        <GoalsList goals={goals} />
      )}
    </React.Fragment>
  );
};

export default Goals;
