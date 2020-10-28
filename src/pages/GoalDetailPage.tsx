import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GoalProjectionChart from '../components/Goals/GoalProjectionChart';
import Goals, { MockGoal } from '../components/Goals/Goals';
import { toDollarString } from '../components/Performance/Performance';
import { selectCurrentGoalId, selectGoals } from '../selectors/goals';
import {
  selectDashboardGroups,
  selectTotalGroupHoldings,
} from '../selectors/groups';
import { InputPrimary } from '../styled/Form';

const ProgressBar = styled.div`
  background: lightgrey;
`;
const Progress = styled.div`
  background: #03846d;
`;

const daysBetween = (firstDate: Date, secondDate: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    firstDate.getDate(),
  );
  const utc2 = Date.UTC(
    secondDate.getFullYear(),
    secondDate.getMonth(),
    secondDate.getDate(),
  );

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const GoalDetailPage = () => {
  // const goalsFeature = useSelector(selectGoalsFeature);
  const goalId = useSelector(selectCurrentGoalId);
  let goal = useSelector(selectGoals).data?.find(x => x.id === goalId);
  const [returnRate, setReturnRate] = useState(0);
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
  const today = new Date();
  const daysUntilGoalEnd = daysBetween(today, new Date(goal?.target_date));
  const base = 1 + 0.01 * returnRate;
  const exponent = daysUntilGoalEnd / 365.25;
  const gainFromReturnRate =
    currentValue * Math.pow(base, exponent) - currentValue;
  console.log(gainFromReturnRate);

  const projectedAccountValue = getProjectedValue(
    currentValue,
    returnRate,
    goal?.contribution_target,
    goal?.contribution_frequency,
    daysUntilGoalEnd,
  );
  //currentValue + goal?.projected_gain_by_end_date + gainFromReturnRate;
  const handleReturnChange = (e: any) => {
    setReturnRate(e.target.value);
  };

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
        {toDollarString(goal?.contribution_target)} per{' '}
        {goal?.contribution_frequency}
      </div>
      <div>
        Projected account value at target date: $
        {toDollarString(projectedAccountValue)}
      </div>
      <div>Progress: {progressPercent.toFixed(0)}%</div>
      <ProgressBar>
        <Progress
          style={{ height: '24px', width: progressPercent + '%' }}
        ></Progress>
      </ProgressBar>
      <div>Contribution Streak: {goal?.contribution_streak}</div>
      <GoalProjectionChart
        goal={goal}
        currentValue={currentValue}
        projectedValue={projectedAccountValue}
      ></GoalProjectionChart>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        Assuming: <br />
        Return Rate:{' '}
        <InputPrimary
          type="number"
          min={0}
          max={100}
          onChange={handleReturnChange}
        />
      </div>
    </React.Fragment>
  );
};

export default GoalDetailPage;

const getProjectedValue = (
  currentValue: number,
  returnRate: number,
  contributionAmount: number,
  contributionFrequency: string,
  daysUntilGoalEnd: number,
) => {
  const numPeriods = getNumPeriods(contributionFrequency, daysUntilGoalEnd);
  const yearsLeft = daysUntilGoalEnd / 365.25;
  let endBalance = currentValue * (1 + returnRate / 100) ** yearsLeft;
  for (let i = 0; i < numPeriods; i++) {
    endBalance +=
      contributionAmount *
      (1 + returnRate / 100) **
        (yearsLeft - numPeriods / getPeriodsPerYear(contributionFrequency));
  }
  return endBalance;
};

const getNumPeriods = (
  contributionFrequency: string,
  daysUntilGoalEnd: number,
) => {
  let daysInPeriod;
  if (contributionFrequency === 'biweekly') {
    daysInPeriod = 14;
  } else if (contributionFrequency === 'monthly') {
    daysInPeriod = 365.24 / 12;
  } else if (contributionFrequency === 'quarterly') {
    daysInPeriod = 365.24 / 4;
  } else if (contributionFrequency === 'semiannually') {
    daysInPeriod = 365.24 / 2;
  } else if (contributionFrequency === 'annually') {
    daysInPeriod = 365.24;
  } else {
    // Default to monthly
    daysInPeriod = 365.24 / 12;
  }
  const numPeriods = Math.floor(daysUntilGoalEnd / daysInPeriod);
  return numPeriods;
};

const getPeriodsPerYear = (contributionFrequency: string) => {
  let periodsPerYear;
  if (contributionFrequency === 'biweekly') {
    periodsPerYear = 26;
  } else if (contributionFrequency === 'monthly') {
    periodsPerYear = 12;
  } else if (contributionFrequency === 'quarterly') {
    periodsPerYear = 4;
  } else if (contributionFrequency === 'semiannually') {
    periodsPerYear = 2;
  } else if (contributionFrequency === 'annually') {
    periodsPerYear = 1;
  } else {
    // Default to monthly
    periodsPerYear = 12;
  }
  return periodsPerYear;
};
