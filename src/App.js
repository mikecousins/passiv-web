import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AboutPage from './pages/AboutPage';
import SecurityPage from './pages/SecurityPage';
import AccountGroupPage from './pages/AccountGroupPage';
import DashboardPage from './pages/DashboardPage';
import AccountPage from './pages/AccountPage';
import SettingsPage from './pages/SettingsPage';
import SecureRoute from './routes/SecureRoute';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="container mx-auto shadow bg-grey-lightest pb-2">
        <Header />
        <div className="min-h-screen md:flex">
          <div className="flex-none w-full md:max-w-xs bg-black text-white">
            <SideBar />
          </div>
          <div className="flex-1 bg-grey-lightest p-4">
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegistrationPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/pricing" component={PricingPage} />
              <Route path="/security" component={SecurityPage} />
              <SecureRoute path="/dashboard" component={DashboardPage} />
              <SecureRoute path="/group" component={AccountGroupPage} />
              <SecureRoute path="/account" component={AccountPage} />
              <SecureRoute path="/settings" component={SettingsPage} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
