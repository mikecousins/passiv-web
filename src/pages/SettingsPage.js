import React, { Component } from 'react';
import CredentialsManager from '../components/CredentialsManager';
import SubscriptionManager from '../components/SubscriptionManager';
import ConnectionsManager from '../components/ConnectionsManager';

class SettingsPage extends Component {

  render() {
    return (
    <React.Fragment>
      <CredentialsManager />

      <SubscriptionManager />

      <ConnectionsManager />

    </React.Fragment>
    );
  }
};

export default SettingsPage;
