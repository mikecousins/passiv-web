import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

let LoginLinksStyle = styled.div`
  margin: 15px 0;
    a {
      color: var(--brand-blue);
      margin-left: 10px;
    }
`

const LoginLinks = (props) => {
  let links = [];

  const resetLink = (
    <LoginLinksStyle key="reset">
      Forgot your password?
      <Link to="/app/reset-password">
        Reset it!
      </Link>
    </LoginLinksStyle>
  )

  const signUpLink = (
    <LoginLinksStyle key="register">
      Don't have an account?
      <Link to="/app/register">
        Sign up!
      </Link>
    </LoginLinksStyle>
  )

  const loginLink = (
    <LoginLinksStyle key="login">
      Already have an account?
      <Link to="/app/login">
        Login!
      </Link>
    </LoginLinksStyle>
  )

  const loginRememberedLink = (
    <LoginLinksStyle key="login-remembered">
      Remembered your password?
      <Link to="/app/login">
        Login!
      </Link>
    </LoginLinksStyle>
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
