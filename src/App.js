import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage';
import RegistrationPage from './pages/RegistrationPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import PrivacyPage from './pages/PrivacyPage';
import SecurityPage from './pages/SecurityPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import DashboardPage from './pages/DashboardPage';
import GroupPage from './pages/GroupPage';
import SettingsPage from './pages/SettingsPage';
import QuestradeOauthPage from './pages/QuestradeOauthPage';
import SecureRoute from './routes/SecureRoute';
import { StripeProvider } from 'react-stripe-elements';
import './index.css';


const questradeOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = "/app/oauth/questrade?" + urlParams;
  return (<Redirect to={newPath}/>)
}

const App = () => (
  <Layout>
    <StripeProvider apiKey="pk_test_UEivjUoJpfSDWq5i4xc64YNK">
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/app" exact render={() => (<Redirect to="/app/login"/>)} />
        <Route path="/app/login" component={LoginPage} />
        <Route path="/app/register" component={RegistrationPage} />
        <Route path="/app/reset-password" component={ResetPasswordPage} />
        <Route path="/app/reset-password-confirm/:token" component={ResetPasswordConfirmPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/security" component={SecurityPage} />
        <Route path="/termsofservice" component={TermsOfServicePage} />
        <SecureRoute path="/app/dashboard" component={DashboardPage} />
        <SecureRoute path="/app/group/:groupId" component={GroupPage} />
        <SecureRoute path="/app/settings" component={SettingsPage} />
        <SecureRoute path="/app/oauth/questrade" component={QuestradeOauthPage} />
        <Route exact path="/oauth/questrade" render={() => questradeOauthRedirect()} />
        <Route exact path="/oauth/questrade-trade" render={() => questradeOauthRedirect()} />
      </Switch>
    </StripeProvider>
  </Layout>
);

export default App;
