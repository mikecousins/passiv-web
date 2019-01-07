import React, { Component } from 'react';
import { connect } from 'react-redux';
import CredentialsManager from '../components/CredentialsManager';
import SubscriptionManager from '../components/SubscriptionManager';
import ConnectionsManager from '../components/ConnectionsManager';
import styled from 'styled-components';



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

const select = state => ({});
const actions = {};

export default connect(select, actions)(SettingsPage);
