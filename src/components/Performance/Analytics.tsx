import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import React, { FunctionComponent } from 'react';
import Performance from './Performance';
import AdjustedCostBasisTab from './AdjustedCostBasisTab';
import GoalsTab from './GoalsTab';
import { H1, P } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import { Link, Route } from 'react-router-dom';
import { SubNav, NavContainer } from '../../pages/GroupPage';
import { selectPathname } from '../../selectors/router';
import {
  selectAdjustedCostBasisFeature,
  selectGoalsFeature,
} from '../../selectors/features';

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
