import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthorizationPage from '../pages/AuthorizationPage';
import SetupGroupPage from '../pages/SetupGroupsPage';
import SetInitialTargetsPage from '../pages/SetInitialTargetsPage';
import OnboardingSummaryPage from '../pages/OnboardingSummaryPage';

// hack to make routing work on both prod and dev
const prefixPath = (path: string) => {
  return `/app${path}`;
};

const InsecureApp = () => (
  <Switch>
    <Route path={prefixPath('/authorization')}>
      <AuthorizationPage />
    </Route>
    <Route path={prefixPath('/setup-groups')}>
      <SetupGroupPage />
    </Route>
    <Route path={prefixPath('/initial-targets')}>
      <SetInitialTargetsPage />
    </Route>
    <Route path={prefixPath('/summary')}>
      <OnboardingSummaryPage />
    </Route>
  </Switch>
);

export default InsecureApp;
