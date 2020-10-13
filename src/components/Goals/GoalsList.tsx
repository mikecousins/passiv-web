import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectGoals } from '../../selectors/goals';
import GoalWidget from './GoalWidget';

export const GoalsList = () => {
  const goals = useSelector(selectGoals).data;
  const goalButtons: any = [];

  goals?.forEach(goal => {
    goalButtons.push(<GoalWidget goal={goal} />);
  });

  return (
    <React.Fragment>
      <div>View Mode</div>
      {goalButtons}
    </React.Fragment>
  );
};

export default GoalsList;
