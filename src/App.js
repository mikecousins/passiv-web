import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import AccountGroupPage from './pages/AccountGroupPage';
import DashboardPage from './pages/DashboardPage';
import AccountPage from './pages/AccountPage';
import SettingsPage from './pages/SettingsPage';
import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container mx-auto shadow bg-grey-lightest pb-2">
          <Header />
          <div class="min-h-screen md:flex">
            <div class="flex-none w-full md:max-w-xs bg-black text-white">
              <SideBar />
            </div>
            <div class="flex-1 bg-grey-lightest p-4">
              <Switch>
                <Route path="/" exact component={DashboardPage} />
                <Route path="/group" component={AccountGroupPage} />
                <Route path="/account" component={AccountPage} />
                <Route path="/settings" component={SettingsPage} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
