import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import React, { FunctionComponent } from 'react';
import Performance from './Performance';
import AdjustedCostBasisTab from './AdjustedCostBasisTab';
import { H1, P } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import { Link, Route } from 'react-router-dom';
import { SubNav, NavContainer } from '../../pages/GroupPage';
import { selectPathname } from '../../selectors/router';
import { selectAdjustedCostBasisFeature } from '../../selectors/features';

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

export const Analytics = () => {
  const pathname = useSelector(selectPathname);
  const acbFeature = useSelector(selectAdjustedCostBasisFeature);

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
        </NavContainer>
      </SubNav>
      <Route path="/app/performance" exact component={Performance} />
      <Route
        path="/app/performance/acb"
        exact
        component={AdjustedCostBasisTab}
      />
    </React.Fragment>
  );
};

export default Analytics;
