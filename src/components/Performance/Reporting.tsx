import { useSelector } from 'react-redux';
import React from 'react';
import Performance from './Performance';
import AdjustedCostBasisTab from './AdjustedCostBasisTab';
import GoalsTab from './GoalsTab';
import { Link, Route } from 'react-router-dom';
import { SubNav, NavContainer } from '../../pages/GroupPage';
import { selectPathname } from '../../selectors/router';
import { selectAdjustedCostBasisFeature } from '../../selectors/features';

const performanceSelected = (pathname: string) => {
  if (pathname === `/reporting`) {
    return 'active';
  }
};

const acbSelected = (pathname: string) => {
  if (pathname === `/reporting/acb`) {
    return 'active';
  }
};

const goalsSelected = (pathname: string) => {
  if (pathname === `/reporting/goals`) {
    return 'active';
  }
};

export const Analytics = () => {
  const pathname = useSelector(selectPathname);
  const acbFeature = useSelector(selectAdjustedCostBasisFeature);

  return (
    <React.Fragment>
      <SubNav>
        <NavContainer>
          <Link className={performanceSelected(pathname)} to={`/reporting`}>
            Performance
          </Link>
          {acbFeature && (
            <Link className={acbSelected(pathname)} to={`/reporting/acb`}>
              Adjusted Cost Basis
            </Link>
          )}
          <Link className={goalsSelected(pathname)} to={`/reporting/goals`}>
            Goals
          </Link>
        </NavContainer>
      </SubNav>
      <Route path="/reporting" exact component={Performance} />
      <Route path="/reporting/acb" exact component={AdjustedCostBasisTab} />
      <Route path="/reporting/goals" exact component={GoalsTab} />
    </React.Fragment>
  );
};

export default Analytics;
