import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthorizationPage from '../pages/AuthorizationPage';
import SetupGroupPage from '../pages/SetupGroupsPage';
import SetInitialTargetsPage from '../pages/SetInitialTargetsPage';
import OnboardingSummaryPage from '../pages/OnboardingSummaryPage';
import QuestradeOauthPage from '../pages/QuestradeOauthPage';
import AlpacaOauthPage from '../pages/AlpacaOauthPage';
import InteractiveBrokersOauthPage from '../pages/InteractiveBrokersOauthPage';

// hack to make routing work on both prod and dev
const prefixPath = (path: string) => {
  return `/app${path}`;
};

const questradeOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/questrade?' + urlParams;
  return <Redirect to={newPath} />;
};

const alpacaOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/alpaca?' + urlParams;
  return <Redirect to={newPath} />;
};

const interactiveBrokersOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/interactivebrokers?' + urlParams;
  return <Redirect to={newPath} />;
};

const InsecureApp = () => (
  <Switch>
    <Route path={prefixPath('/connect')}>
      <AuthorizationPage onboarding={true} />
    </Route>
    <Route
      path={prefixPath('/oauth/questrade')}
      component={QuestradeOauthPage}
    />
    <Route
      exact
      path="/oauth/questrade"
      render={() => questradeOauthRedirect()}
    />
    <Route
      exact
      path="/oauth/questrade-trade"
      render={() => questradeOauthRedirect()}
    />
    <Route path={prefixPath('/oauth/alpaca')} component={AlpacaOauthPage} />
    <Route exact path="/oauth/alpaca" render={() => alpacaOauthRedirect()} />
    <Route
      path={prefixPath('/oauth/interactivebrokers')}
      component={InteractiveBrokersOauthPage}
    />
    <Route
      exact
      path="/oauth/interactivebrokers"
      render={() => interactiveBrokersOauthRedirect()}
    />
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
      <Redirect to={prefixPath('/connect')} />
    </Route>
  </Switch>
);

export default InsecureApp;
