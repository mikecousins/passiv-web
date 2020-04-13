import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import React, { FunctionComponent } from 'react';
import Performance from './Performance';
import { H1, P } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import { Link, Route } from 'react-router-dom';
import { SubNav, NavContainer } from '../../pages/GroupPage';
import { selectPathname } from '../../selectors/router';

const performanceSelected = (pathname: string) => {
  if (pathname === `/app/performance`) {
    return 'active';
  }
};

export const Analytics = () => {
  const pathname = useSelector(selectPathname);

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
        </NavContainer>
      </SubNav>
      <Route path="/app/performance" exact component={Performance} />
    </React.Fragment>
  );
};

export default Analytics;
