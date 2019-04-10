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
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            exact
            render={() => <Redirect to="/app/login" />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/login`}
            component={LoginPage}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/register`}
            component={RegistrationPage}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/reset-password`}
            component={ResetPasswordPage}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/reset-password-confirm/:token`}
            component={ResetPasswordConfirmPage}
          />
          <Route path={`${process.env.PUBLIC_URL}/help`} component={HelpPage} />
          <SecureRoute
            path={`${process.env.PUBLIC_URL}/dashboard`}
            component={DashboardPage}
          />
          <SecureRoute
            path={`${process.env.PUBLIC_URL}/group/:groupId`}
            component={GroupPage}
          />
          <SecureRoute
            path={`${process.env.PUBLIC_URL}/settings`}
            component={SettingsPage}
          />
          <SecureRoute
            path={`${process.env.PUBLIC_URL}/oauth/questrade`}
            component={QuestradeOauthPage}
          />
          <SecureRoute
            path={`${process.env.PUBLIC_URL}/coupon`}
            component={CouponPage}
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
          <UpdateNotification />
        </Switch>
      </StripeProvider>
    </Layout>
  );
};

export default App;
