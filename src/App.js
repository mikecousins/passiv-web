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
import QuestradeOauthPage from './pages/QuestradeOauthPage';
import CouponPage from './pages/CouponPage';
import SecureRoute from './routes/SecureRoute';
import UpdateNotification from './components/UpdateNotification';

const questradeOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/questrade?' + urlParams;
  return <Redirect to={newPath} />;
};

// hack to make routing work on both prod and dev
const prefixPath = path => {
  return `/app${path}`;
};

const App = () => {
  const [stripe, setStripe] = useState(null);
  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe('pk_live_LTLbjcwtt6gUmBleYqVVhMFX'));
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        setStripe(window.Stripe('pk_live_LTLbjcwtt6gUmBleYqVVhMFX'));
      });
    }
  }, []);
  return (
    <Layout>
      <StripeProvider stripe={stripe}>
        <Switch>
          <Route
            path={prefixPath('/')}
            exact
            render={() => <Redirect to="/app/login" />}
          />
          <Route path={prefixPath('/login')} component={LoginPage} />
          <Route path={prefixPath('/register')} component={RegistrationPage} />
          <Route
            path={prefixPath('/reset-password')}
            component={ResetPasswordPage}
          />
          <Route
            path={prefixPath('/reset-password-confirm/:token')}
            component={ResetPasswordConfirmPage}
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
          <SecureRoute
            path={prefixPath('/oauth/questrade')}
            component={QuestradeOauthPage}
          />
          <SecureRoute path={prefixPath('/coupon')} component={CouponPage} />
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
          <UpdateNotification />
        </Switch>
      </StripeProvider>
    </Layout>
  );
};

export default App;
