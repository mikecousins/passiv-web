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

const OnboardingApp = () => <React.Fragment></React.Fragment>;

export default OnboardingApp;
