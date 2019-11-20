import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthorizationPage from '../pages/AuthorizationPage';
import SetupGroupPage from '../pages/SetupGroupsPage';
import SetInitialTargetsPage from '../pages/SetInitialTargetsPage';
import OnboardingSummaryPage from '../pages/OnboardingSummaryPage';
import WelcomePage from '../pages/WelcomePage';

// hack to make routing work on both prod and dev
const prefixPath = (path: string) => {
  return `/app${path}`;
};

const OnboardingApp = () => (
  <Switch>
    <Route path={prefixPath('/connect/:brokerage?')}>
      <AuthorizationPage onboarding={true} />
    </Route>
    <Route path={prefixPath('/welcome')}>
      <WelcomePage />
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
    <Route path="*">
      <Redirect to={prefixPath('/welcome')} />
    </Route>
  </Switch>
);

export default OnboardingApp;
