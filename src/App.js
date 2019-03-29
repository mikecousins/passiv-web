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

const App = () => {
  const [stripe, setStripe] = useState(null);
  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe('pk_test_UEivjUoJpfSDWq5i4xc64YNK'));
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        setStripe(window.Stripe('pk_test_UEivjUoJpfSDWq5i4xc64YNK'));
      });
    }
  }, []);
  return (
    <Layout>
      <StripeProvider stripe={stripe}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app/login" />} />
          <Route
            path="/app"
            exact
            render={() => <Redirect to="/app/login" />}
          />
          <Route path="/app/login" component={LoginPage} />
          <Route path="/app/register" component={RegistrationPage} />
          <Route path="/app/reset-password" component={ResetPasswordPage} />
          <Route
            path="/app/reset-password-confirm/:token"
            component={ResetPasswordConfirmPage}
          />
          <Route path="/app/help" component={HelpPage} />
          <SecureRoute path="/app/dashboard" component={DashboardPage} />
          <SecureRoute path="/app/group/:groupId" component={GroupPage} />
          <SecureRoute path="/app/settings" component={SettingsPage} />
          <SecureRoute
            path="/app/oauth/questrade"
            component={QuestradeOauthPage}
          />
          <SecureRoute path="/app/coupon" component={CouponPage} />
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
