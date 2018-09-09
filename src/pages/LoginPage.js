import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginStartedAsync } from '../actions';
import { selectLoggedIn } from '../selectors';

const LoginPage = (props) => {
  if (props.loggedIn) {
    return <Redirect to={props.location.state.nextPathname} />;
  } else {
    return (
      <div>
        <div>Login</div>
        <div>{props.loggedIn ? <span>Logged In</span> : <span>Not Logged In</span>}</div>
        <button onClick={props.startLogin} className="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded mb-4 mr-4">Login</button>
      </div>
    );
  }
}

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

const actions = { startLogin: loginStartedAsync };

export default connect(select, actions)(LoginPage);
