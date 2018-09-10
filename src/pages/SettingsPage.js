import React from 'react';
import { connect } from 'react-redux';
import { logoutStartedAsync } from '../actions';
import { selectSettings } from '../selectors';

const SettingsPage = (props) => (
  <React.Fragment>
    <h1>Settings</h1>
    <button
      type="button"
      onClick={props.startLogout}
      className=""
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
