import React from 'react';
import { connect } from 'react-redux';
import { loginStarted } from '../actions';

const LoginPage = (props) => (
  <React.Fragment>
    <div>Login</div>
    <div>{props.loggedIn ? <span>Logged In</span> : <span>Not Logged In</span>}</div>
    <button onClick={props.startLogin}>Login</button>
  </React.Fragment>
);

const select = state => ({
  loggedIn: state.auth.loggedIn,
});

const actions = { startLogin: loginStarted };

export default connect(select, actions)(LoginPage);
