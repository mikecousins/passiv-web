import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import GroupPage from '../pages/GroupPage';
import SettingsPage from '../pages/SettingsPage';
import QuestradeOauthPage from '../pages/QuestradeOauthPage';
import AlpacaOauthPage from '../pages/AlpacaOauthPage';
import InteractiveBrokersOauthPage from '../pages/InteractiveBrokersOauthPage';
import CouponPage from '../pages/CouponPage';
import SharePage from '../pages/SharePage';
import AuthorizationPage from '../pages/AuthorizationPage';
import { StripeProvider } from 'react-stripe-elements';

declare global {
  interface Window {
    Stripe: any;
  }
}

// hack to make routing work on both prod and dev
const prefixPath = (path: string) => {
  return `/app${path}`;
};

// use the stripe test key unless we're in prod
const stripePublicKey =
  process.env.REACT_APP_BASE_URL_OVERRIDE &&
  process.env.REACT_APP_BASE_URL_OVERRIDE === 'getpassiv.com'
    ? 'pk_live_LTLbjcwtt6gUmBleYqVVhMFX'
    : 'pk_test_UEivjUoJpfSDWq5i4xc64YNK';

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

const SecureApp = () => {
  const [stripe, setStripe] = useState<any>(null);
  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(stripePublicKey));
    } else {
      document.querySelector('#stripe-js')!.addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        setStripe(window.Stripe(stripePublicKey));
      });
    }
  }, []);

  return (
    <StripeProvider stripe={stripe}>
      <Switch>
        <Route path="/" exact>
          <Redirect to={prefixPath('/dashboard')} />
        </Route>
        <Route path={prefixPath('/')} exact>
          <Redirect to={prefixPath('/dashboard')} />
        </Route>
        <Route path={prefixPath('/dashboard')} component={DashboardPage} />
        <Route path={prefixPath('/group/:groupId')} component={GroupPage} />
        <Route path={prefixPath('/settings/connect')}>
          <AuthorizationPage onboarding={false} />
        </Route>
        <Route path={prefixPath('/settings')} component={SettingsPage} />
        <Route path={prefixPath('/coupon')} component={CouponPage} />

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
        <Route
          exact
          path="/oauth/alpaca"
          render={() => alpacaOauthRedirect()}
        />
        <Route
          path={prefixPath('/oauth/interactivebrokers')}
          component={InteractiveBrokersOauthPage}
        />
        <Route
          exact
          path="/oauth/interactivebrokers"
          render={() => interactiveBrokersOauthRedirect()}
        />
        <Route path={prefixPath('/share')} component={SharePage} />
        <Route path="*">
          <Redirect to={prefixPath('/dashboard')} />
        </Route>
      </Switch>
    </StripeProvider>
  );
};

export default SecureApp;
