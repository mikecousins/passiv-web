import { useSelector } from 'react-redux';
import React from 'react';
import Performance from './Performance';
import AdjustedCostBasisTab from './AdjustedCostBasisTab';
import GoalsTab from './GoalsTab';
import { Link, Route } from 'react-router-dom';
import { SubNav, NavContainer } from '../../pages/GroupPage';
import { selectPathname } from '../../selectors/router';
import {
  selectAdjustedCostBasisFeature,
  selectGoalsFeature,
} from '../../selectors/features';
import styled from '@emotion/styled';

const BetaBanner = styled.p`
  text-align: center;
  margin-top: -20px;
  color: #555555;
`;

const performanceSelected = (pathname: string) => {
  if (pathname === `/app/performance`) {
    return 'active';
  }
};

const acbSelected = (pathname: string) => {
  if (pathname === `/app/performance/acb`) {
    return 'active';
  }
};

const goalsSelected = (pathname: string) => {
  if (pathname === `/app/performance/goals`) {
    return 'active';
  }
};

export const Analytics = () => {
  const pathname = useSelector(selectPathname);
  const acbFeature = useSelector(selectAdjustedCostBasisFeature);
  const goalsFeature = useSelector(selectGoalsFeature);

  return (
    <React.Fragment>
      <BetaBanner>
        Open Beta: Help us improve our tools by{' '}
        <a href="mailto:reporting@getpassiv.com">sharing feedback</a>
      </BetaBanner>
      <SubNav>
        <NavContainer>
          <Link
            className={performanceSelected(pathname)}
            to={`/app/performance`}
          >
            Performance
          </Link>
          {acbFeature && (
            <Link className={acbSelected(pathname)} to={`/app/performance/acb`}>
              Adjusted Cost Basis
            </Link>
          )}
          {goalsFeature && (
            <Link
              className={goalsSelected(pathname)}
              to={`/app/performance/goals`}
            >
              Goals
            </Link>
          )}
        </NavContainer>
      </SubNav>
      <Route path="/app/performance" exact component={Performance} />
      <Route
        path="/app/performance/acb"
        exact
        component={AdjustedCostBasisTab}
      />
      <Route path="/app/performance/goals" exact component={GoalsTab} />
    </React.Fragment>
  );
};

export default Analytics;
