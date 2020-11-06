import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  DashboardGroup,
  selectTotalGroupHoldings,
} from '../../selectors/groups';
import { Goal } from '../../types/goals';
import { P, H3 } from '../../styled/GlobalElements';
import { toDollarString } from '../Performance/Performance';
import ShadowBox from '../../styled/ShadowBox';
import Grid from '../../styled/Grid';

const Heading = styled.h2`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 19px;
  color: #04a287;
  span {
    font-size: 18px;
    font-weight: 600;
    color: #1b1d22;
    margin-left: 6px;
  }
`;
const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const GridAlignBottom = styled(Grid)`
  align-items: flex-end;
`;
const ProgressBar = styled.div`
  background: #eee;
  width: 100%;
  border-radius: 25rem;
  overflow: hidden;
  margin-bottom: 12px;
`;
const Progress = styled.div`
  background: #05a286;
`;
const ProgressCopy = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0 0 6px;
  text-align: center;
`;
const ProgressContainer = styled.div`
  margin-right: 5rem;
`;
const ShadowBoxWHover = styled(ShadowBox)`
  transition: all 0.25s;
  border: 1px solid #fff;
  &:hover {
    box-shadow: 4px 6px 12px 0 rgb(107 110 115 / 40%);
    border: 1px solid #023ca2;
  }
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
      <UnstyledLink to={`/app/goal/${goal.id}`}>
        <ShadowBoxWHover>
          <Heading>
            {goal?.title} <span> {goal?.target_date}</span>
          </Heading>
          <GridAlignBottom columns="200px auto 200px">
            <div>
              <P>
                <H3>Balance</H3> ${toDollarString(currentValue)}
              </P>
            </div>
            <ProgressContainer>
              <ProgressCopy>
                You're <strong>{progressPercent.toFixed(0)}%</strong> of the way
                there!
              </ProgressCopy>
              <ProgressBar>
                <Progress
                  style={{ height: '24px', width: progressPercent + '%' }}
                ></Progress>
              </ProgressBar>
            </ProgressContainer>
            <div>
              <P>
                <H3>Target</H3> ${toDollarString(targetValue)}
              </P>
            </div>
          </GridAlignBottom>
          <div>Contribution Streak: {goal?.contribution_streak}</div>
        </ShadowBoxWHover>
      </UnstyledLink>
    </React.Fragment>
  );
};

export default GoalWidget;
