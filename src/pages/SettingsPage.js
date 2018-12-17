import React from 'react';
import { connect } from 'react-redux';
import { selectSettings } from '../selectors';
import AuthorizationPicker from '../components/AuthorizationPicker';

const SettingsPage = (props) => (
  <React.Fragment>
    <h1>Settings</h1>
    <p className="my-2">Logged in as {props.settings && props.settings.email}</p>
    <AuthorizationPicker/>
  </React.Fragment>
);

const select = state => ({
  settings: selectSettings(state),
});
const actions = {};

export default connect(select, actions)(SettingsPage);
