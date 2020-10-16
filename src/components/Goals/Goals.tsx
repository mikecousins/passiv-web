import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGoals } from '../../selectors/goals';
import { P, A } from '../../styled/GlobalElements';
import { Goal } from '../../types/goals';
import GoalSetup from './GoalSetup';
import GoalsList from './GoalsList';

const BetaBanner = styled(P)`
  text-align: center;
  padding-bottom: 20px;
  color: #555555;
`;

const AddGoalButton = styled.button`
  float: right;
  background: #03846d;
  color: #fff;
  z-index: 2;
  border-radius: 4px 4px 4px 4px;
  margin-right: 6px;
  padding: 10px;
  &.noGoalsMade {
    font-size: 22pt;
  }
`;

export const MockGoal: Goal = {
  id: 'mockgoal',
  title: 'Mock Goal',
  created_date: '2020-10-16',
  target_date: '2021-10-16',
  total_value_target: 50000,
  contribution_frequency: 'monthly',
  monthly_contribution_target: 1500,
  completed: false,
  portfolio_group: null,
  contribution_streak: 4,
};

export const Goals = () => {
  const [currentMode, setCurrentMode] = useState('view');
  let goalsSelect: Goal[] | null = [];
  goalsSelect = useSelector(selectGoals).data;
  let goals: Goal[] | null;
  if (goalsSelect !== undefined && goalsSelect !== null) {
    goals = goalsSelect?.concat([MockGoal]);
  } else {
    goals = [MockGoal];
  }

  let goalsClass = 'goalsExist';
  if (goals !== null && goals !== undefined) {
    if (goals?.length === 0) {
      goalsClass = 'noGoalsMade';
    }
  }

  return (
    <React.Fragment>
      {currentMode === 'view' && (
        <AddGoalButton
          onClick={() => setCurrentMode('add')}
          className={goalsClass}
        >
          Add Goal +{' '}
        </AddGoalButton>
      )}
      {currentMode === 'add' && <GoalSetup setGoalMode={setCurrentMode} />}
      {currentMode === 'view' && <GoalsList goals={goals} />}

      <BetaBanner>
        Open Beta: Help us improve our tools by{' '}
        <A href="mailto:reporting@getpassiv.com">sharing feedback</A>
      </BetaBanner>
    </React.Fragment>
  );
};

export default Goals;
