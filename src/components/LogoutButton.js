import React from 'react';
import { connect } from 'react-redux';
import { logoutStartedAsync } from '../actions';


const LogoutButton = (props) => (
  <button
    type="button"
    onClick={props.startLogout}
    className="bg-blue hover:bg-blue-dark text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Log Out
  </button>
);

const select = state => ({});
const actions = { startLogout: logoutStartedAsync };

export default connect(select, actions)(LogoutButton);
