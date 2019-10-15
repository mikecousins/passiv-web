import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import GroupPage from '../pages/GroupPage';
import SettingsPage from '../pages/SettingsPage';
import QuestradeOauthPage from '../pages/QuestradeOauthPage';
import AlpacaOauthPage from '../pages/AlpacaOauthPage';
import CouponPage from '../pages/CouponPage';
import SecureRoute from '../routes/SecureRoute';
import SharePage from '../pages/SharePage';

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

const SecureApp = () => (
  <React.Fragment>
    <Route
      path="/"
      exact
      render={() => <Redirect to={prefixPath('/dashboard')} />}
    />
    <Route
      path={prefixPath('/')}
      exact
      render={() => <Redirect to={prefixPath('/dashboard')} />}
    />
    <SecureRoute path={prefixPath('/dashboard')} component={DashboardPage} />
    <SecureRoute path={prefixPath('/group/:groupId')} component={GroupPage} />
    <SecureRoute path={prefixPath('/settings')} component={SettingsPage} />
    <SecureRoute path={prefixPath('/coupon')} component={CouponPage} />
    <SecureRoute
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
    <SecureRoute
      path={prefixPath('/oauth/alpaca')}
      component={AlpacaOauthPage}
    />
    <Route exact path="/oauth/alpaca" render={() => alpacaOauthRedirect()} />
    <Route path={prefixPath('/share')} component={SharePage} />
    <Route path="*">
      <Redirect to={prefixPath('/dashboard')} />
    </Route>
  </React.Fragment>
);

export default SecureApp;
