import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
  selectDashboardGroups,
  selectTotalGroupHoldings,
} from '../../selectors/groups';
import { Goal } from '../../types/goals';
import GoalWidget from './GoalWidget';

type Props = {
  goals: Goal[] | null;
};
export const GoalsList: FunctionComponent<Props> = ({ goals }) => {
  const goalWidgets: any = [];
  const groups = useSelector(selectDashboardGroups);

  goals?.forEach(goal => {
    const group = groups.find(x => x.id === goal.portfolio_group?.id);
    goalWidgets.push(<GoalWidget goal={goal} group={group} />);
  });

  return (
    <React.Fragment>
      <div>View Mode</div>
      <br />
      {goalWidgets}
    </React.Fragment>
  );
};

export default GoalsList;
