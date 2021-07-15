import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectDashboardGroups,
  selectTotalGroupHoldings,
} from '../../selectors/groups';
import { Goal } from '../../types/goals';
import { selectGoals } from '../../selectors/goals';
import GoalWidget, { getProgressPercent } from './GoalWidget';

const DashboardGoalWidgets = () => {
  const goals = useSelector(selectGoals).data;
  const totalHoldings = useSelector(selectTotalGroupHoldings);
  const groups = useSelector(selectDashboardGroups);

  const goalWidgets: any = [];

  goals
    ?.sort((goalA: Goal, goalB: Goal) => {
      const groupA = groups.find((x) => x.id === goalA.portfolio_group?.id);
      const groupB = groups.find((x) => x.id === goalB.portfolio_group?.id);
      return (
        getProgressPercent(goalB, groupB, totalHoldings) -
        getProgressPercent(goalA, groupA, totalHoldings)
      );
    })
    ?.forEach((goal: Goal) => {
      if (goal.display_on_dashboard) {
        const group = groups.find((x) => x.id === goal.portfolio_group?.id);
        goalWidgets.push(<GoalWidget goal={goal} group={group} />);
      }
    });

  return <>{goalWidgets}</>;
};

export default DashboardGoalWidgets;
