import React from 'react';
import { connect } from 'react-redux';
import { logoutStartedAsync } from '../actions';
import { selectSettings } from '../selectors';

const SettingsPage = (props) => (
  <React.Fragment>
    <h1>Settings</h1>
    <p>Logged in as {props.settings && props.settings.email}</p>
    <button
      type="button"
      onClick={props.startLogout}
      className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Log Out
    </button>
  </React.Fragment>
);

const select = state => ({
  settings: selectSettings(state),
});
const actions = { startLogout: logoutStartedAsync };

export default connect(select, actions)(SettingsPage);
