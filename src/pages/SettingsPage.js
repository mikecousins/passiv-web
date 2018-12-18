import React, { Component } from 'react';
import { connect } from 'react-redux';
import CredentialsManager from '../components/CredentialsManager';
import SubscriptionManager from '../components/SubscriptionManager';
import ConnectionsManager from '../components/ConnectionsManager';


class SettingsPage extends Component {


  render() {
    return (
    <React.Fragment>
      <div className="flex mb-4">
        <div className="w-1/2 mr-4">
          <CredentialsManager />
        </div>
        <div className="w-1/2">
          <SubscriptionManager />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-full">
          <ConnectionsManager />
        </div>
      </div>
    </React.Fragment>
    );
  }
};

const select = state => ({});
const actions = {};

export default connect(select, actions)(SettingsPage);
