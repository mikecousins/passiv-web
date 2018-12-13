import React from 'react';
import { connect } from 'react-redux';
import { logoutStartedAsync } from '../actions';
import { selectSettings } from '../selectors';
import AuthorizationPicker from '../components/AuthorizationPicker';

const SettingsPage = (props) => (
  <React.Fragment>
    <h1>Settings</h1>
    <p className="my-2">Logged in as {props.settings && props.settings.email}</p>
    <button
      type="button"
      onClick={props.startLogout}
      className="bg-blue hover:bg-blue-dark text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Log Out
    </button>
    <AuthorizationPicker/>
  </React.Fragment>
);

const select = state => ({
  settings: selectSettings(state),
});
const actions = { startLogout: logoutStartedAsync };

export default connect(select, actions)(SettingsPage);
