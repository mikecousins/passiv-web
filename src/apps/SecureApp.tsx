import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import GroupPage from '../pages/GroupPage';
import SettingsPage from '../pages/SettingsPage';
import CouponPage from '../pages/CouponPage';
import PerformancePage from '../pages/PerformancePage';
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
        <Route path={prefixPath('/settings/connect/:brokerage?')}>
          <AuthorizationPage onboarding={false} />
        </Route>
        <Route path={prefixPath('/settings')} component={SettingsPage} />
        <Route path={prefixPath('/performance')} component={PerformancePage} />
        <Route path={prefixPath('/coupon')} component={CouponPage} />
        <Route path={prefixPath('/share')} component={SharePage} />
      </Switch>
    </StripeProvider>
  );
};

export default SecureApp;
