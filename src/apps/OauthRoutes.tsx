import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import QuestradeOauthPage from '../pages/QuestradeOauthPage';
import AlpacaOauthPage from '../pages/AlpacaOauthPage';
import InteractiveBrokersOauthPage from '../pages/InteractiveBrokersOauthPage';

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

const OauthRoutes = () => (
  <Switch>
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
  </Switch>
);

export default OauthRoutes;
