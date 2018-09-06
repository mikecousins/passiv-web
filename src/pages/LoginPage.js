import React from 'react';
import { connect } from 'react-redux';
import { loginStartedAsync } from '../actions';

const LoginPage = (props) => (
  <React.Fragment>
    <div>Login</div>
    <div>{props.loggedIn ? <span>Logged In</span> : <span>Not Logged In</span>}</div>
    <button onClick={props.startLogin} className="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded mb-4 mr-4">Login</button>
  </React.Fragment>
);

const select = state => ({
  loggedIn: state.auth.loggedIn,
});

const actions = { startLogin: loginStartedAsync };

export default connect(select, actions)(LoginPage);
