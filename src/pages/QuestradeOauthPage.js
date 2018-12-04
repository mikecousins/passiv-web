import React from 'react';
import { connect } from 'react-redux';

// import { logoutStartedAsync } from '../actions';
// import { selectSettings } from '../selectors';

const QuestradeOauthPage = (props) => (
  <React.Fragment>
    <h1>Questrade Connection</h1>
    <button
      type="button"
      onClick={props.startLogout}
      className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Log Out
    </button>
    <a
      href="https://login.questrade.com/oauth2/authorize?client_id=AMTP_SauxtnL1ZkwIa2UnPoAwjQhkQ&response_type=code&scope=read_acc,read_md&redirect_uri=https://staging.getpassiv.com/api/v1/oauth/questrade"
      type="button"
      className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Authorize
    </a>
  </React.Fragment>
);

const select = state => ({
  settings: selectSettings(state),
});
const actions = { startLogout: logoutStartedAsync };

export default connect(select, actions)(QuestradeOauthPage);
