import { useSelector } from 'react-redux';
import React from 'react';
import Performance from './Performance';
import { Link, Route } from 'react-router-dom';
import { SubNav, NavContainer } from '../../pages/GroupPage';
import { selectPathname } from '../../selectors/router';
import ActivitiesTab from './ActivitiesTab';

const performanceSelected = (pathname: string) => {
  if (pathname === `/reporting`) {
    return 'active';
  }
};
const activitiesSelected = (pathname: string) => {
  if (pathname === `/reporting/activities`) {
    return 'active';
  }
};

const Analytics = () => {
  const pathname = useSelector(selectPathname);

  return (
    <React.Fragment>
      <SubNav>
        <NavContainer>
          <Link className={performanceSelected(pathname)} to={`/reporting`}>
            Performance
          </Link>
          <Link
            className={activitiesSelected(pathname)}
            to={`/reporting/activities`}
          >
            Activities
          </Link>
        </NavContainer>
      </SubNav>
      <Route path="/reporting" exact component={Performance} />
      <Route path="/reporting/activities" exact component={ActivitiesTab} />
    </React.Fragment>
  );
};

export default Analytics;
