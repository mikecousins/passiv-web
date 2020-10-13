import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { Goal } from '../../types/goals';

type Props = {
  goal: Goal;
};
export const GoalWidget: FunctionComponent<Props> = ({ goal }) => {
  return (
    <React.Fragment>
      <div>Title: {goal.title}</div>
      <div>Goal: {goal.total_value_target}</div>
    </React.Fragment>
  );
};

export default GoalWidget;
