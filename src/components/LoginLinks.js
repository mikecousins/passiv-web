import React from 'react';
import { Link } from 'react-router-dom';


const LoginLinks = (props) => {
  let links = [];

  const resetLink = (
    <div key="reset">
      Forgot your password?
      <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/app/reset-password">
        Reset it!
      </Link>
    </div>
  )

  const signUpLink = (
    <div key="register">
      Don't have an account?
      <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/app/register">
        Sign up!
      </Link>
    </div>
  )

  const loginLink = (
    <div key="login">
      Already have an account?
      <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/app/login">
        Login!
      </Link>
    </div>
  )

  const loginRememberedLink = (
    <div key="login-remembered">
      Remembered your password?
      <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/app/login">
        Login!
      </Link>
    </div>
  )


  switch (props.page) {
    case 'reset':
      links.push(loginRememberedLink);
      links.push(signUpLink);
      break;
    case 'login':
      links.push(resetLink);
      links.push(signUpLink);
      break;
    case 'register':
      links.push(loginLink);
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      { links }
    </React.Fragment>
  )
};

export default LoginLinks;
