import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import PrivacyPage from './pages/PrivacyPage';
import SecurityPage from './pages/SecurityPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import DashboardPage from './pages/DashboardPage';
import AccountPage from './pages/AccountPage';
import SettingsPage from './pages/SettingsPage';
import SecureRoute from './routes/SecureRoute';
import './index.css';

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegistrationPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/security" component={SecurityPage} />
      <Route path="/termsofservice" component={TermsOfServicePage} />
      <SecureRoute path="/dashboard" component={DashboardPage} />
      <SecureRoute path="/account/:accountId" component={AccountPage} />
      <SecureRoute path="/settings" component={SettingsPage} />
    </Switch>
  </Layout>
);

export default App;
