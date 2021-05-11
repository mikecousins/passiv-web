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
  if (pathname === `/app/reporting`) {
    return 'active';
  }
};

const acbSelected = (pathname: string) => {
  if (pathname === `/app/reporting/acb`) {
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
          <Link className={performanceSelected(pathname)} to={`/app/reporting`}>
            Performance
          </Link>
          {acbFeature && (
            <Link className={acbSelected(pathname)} to={`/app/reporting/acb`}>
              Adjusted Cost Basis
            </Link>
          )}
        </NavContainer>
      </SubNav>
      <Route path="/app/reporting" exact component={Performance} />
      <Route path="/app/reporting/acb" exact component={AdjustedCostBasisTab} />
      <Route path="/app/reporting/goals" exact component={GoalsTab} />
    </React.Fragment>
  );
};

export default Analytics;
