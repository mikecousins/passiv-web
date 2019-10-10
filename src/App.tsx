import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import Layout from './layouts/Layout';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import GroupPage from './pages/GroupPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import HelpArticlePage from './pages/HelpArticlePage';
import QuestradeOauthPage from './pages/QuestradeOauthPage';
import AlpacaOauthPage from './pages/AlpacaOauthPage';
import CouponPage from './pages/CouponPage';
import SecureRoute from './routes/SecureRoute';
import UpdateNotification from './components/UpdateNotification';
import SharePage from './pages/SharePage';
import DemoLoginPage from './pages/DemoLoginPage';
import '@reach/menu-button/styles.css';

declare global {
  interface Window {
    Stripe: any;
  }
}

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

const App = () => {
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
    <Layout>
      <StripeProvider stripe={stripe}>
        <Switch>
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
          <Route path={prefixPath('/login')} component={LoginPage} />
          <Route path={prefixPath('/register')} component={RegistrationPage} />
          <Route path={prefixPath('/demo')} component={DemoLoginPage} />
          <Route
            path={prefixPath('/reset-password')}
            component={ResetPasswordPage}
          />
          <Route
            path={prefixPath('/reset-password-confirm/:token')}
            component={ResetPasswordConfirmPage}
          />
          <Route
            path={prefixPath('/help/topic/:slug')}
            component={HelpArticlePage}
          />
          <Route path={prefixPath('/help')} component={HelpPage} />
          <SecureRoute
            path={prefixPath('/dashboard')}
            component={DashboardPage}
          />
          <SecureRoute
            path={prefixPath('/group/:groupId')}
            component={GroupPage}
          />
          <SecureRoute
            path={prefixPath('/settings')}
            component={SettingsPage}
          />
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
          <Route
            exact
            path="/oauth/alpaca"
            render={() => alpacaOauthRedirect()}
          />
          <Route path={prefixPath('/share')} component={SharePage} />
          <UpdateNotification />
        </Switch>
      </StripeProvider>
    </Layout>
  );
};

export default App;
