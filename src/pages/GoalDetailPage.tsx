import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MockGoal } from '../components/Goals/Goals';
import { toDollarString } from '../components/Performance/Performance';
import { selectCurrentGoalId, selectGoals } from '../selectors/goals';
import {
  selectDashboardGroups,
  selectTotalGroupHoldings,
} from '../selectors/groups';

const ProgressBar = styled.div`
  background: lightgrey;
`;
const Progress = styled.div`
  background: #03846d;
`;

const GoalDetailPage = () => {
  // const goalsFeature = useSelector(selectGoalsFeature);
  const goalId = useSelector(selectCurrentGoalId);
  let goal = useSelector(selectGoals).data?.find(x => x.id === goalId);
  if (goal === undefined) {
    goal = MockGoal;
  }
  const groups = useSelector(selectDashboardGroups);
  const group = groups.find(x => x.id === goal?.portfolio_group?.id);
  let currentValue = useSelector(selectTotalGroupHoldings);
  if (group !== undefined) {
    currentValue = group.totalHoldings;
  }
  let targetValue = goal?.total_value_target;
  if (targetValue === undefined) {
    targetValue = 100;
  }
  let progressPercent = (currentValue / targetValue) * 100;
  if (progressPercent > 100) {
    progressPercent = 100;
  }

  return (
    <React.Fragment>
      <Link to="/app/goals">Back</Link>
      <div>{goal?.title}</div>
      <div>Some kind of positive statement about saving</div>
      <div>Target Completion Date: {goal?.target_date}</div>
      <div>Current Value: ${toDollarString(currentValue)}</div>
      <div>Target Value: ${toDollarString(targetValue)}</div>
      <div>
        Contributing ${toDollarString(goal?.average_monthly_contributions)} / $
        {toDollarString(goal?.monthly_contribution_target)} Monthly
      </div>
      <div>Progress: {progressPercent.toFixed(0)}%</div>
      <ProgressBar>
        <Progress
          style={{ height: '24px', width: progressPercent + '%' }}
        ></Progress>
      </ProgressBar>
      <div>Contribution Streak: {goal?.contribution_streak}</div>
    </React.Fragment>
  );
};

export default GoalDetailPage;
