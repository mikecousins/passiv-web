import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
  selectDashboardGroups,
  selectTotalGroupHoldings,
} from '../../selectors/groups';
import { Goal } from '../../types/goals';
import GoalWidget, { getProgressPercent } from './GoalWidget';

type Props = {
  goals: Goal[] | null;
};
const GoalsList: FunctionComponent<Props> = ({ goals }) => {
  const goalWidgets: any = [];
  const groups = useSelector(selectDashboardGroups);
  const totalHoldings = useSelector(selectTotalGroupHoldings);
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
      const group = groups.find((x) => x.id === goal.portfolio_group?.id);
      goalWidgets.push(<GoalWidget goal={goal} group={group} />);
    });

  return (
    <React.Fragment>
      {/* <div>View Mode</div> */}
      {goalWidgets}
    </React.Fragment>
  );
};

export default GoalsList;
