import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  DashboardGroup,
  selectTotalGroupHoldings,
} from '../../selectors/groups';
import { Goal } from '../../types/goals';
import { toDollarString } from '../Performance/Performance';

const Widget = styled.div`
  padding-bottom: 20px;
`;
const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const ProgressBar = styled.div`
  background: lightgrey;
  width: 30%;
`;
const Progress = styled.div`
  background: #03846d;
`;

type Props = {
  goal: Goal;
  group: DashboardGroup | undefined;
};
export const GoalWidget: FunctionComponent<Props> = ({ goal, group }) => {
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
      <Widget>
        <UnstyledLink to={`/app/goal/${goal.id}`}>
          <div>Title: {goal?.title}</div>
          <div>Target Completion Date: {goal?.target_date}</div>
          <div>Current Value: ${toDollarString(currentValue)}</div>
          <div>Target Value: ${toDollarString(targetValue)}</div>
          <div>Progress: {progressPercent.toFixed(0)}%</div>
          <ProgressBar>
            <Progress
              style={{ height: '24px', width: progressPercent + '%' }}
            ></Progress>
          </ProgressBar>
        </UnstyledLink>
      </Widget>
    </React.Fragment>
  );
};

export default GoalWidget;
