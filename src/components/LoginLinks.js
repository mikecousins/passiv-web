import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { P } from '../styled/GlobalElements';

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
      <P>
        Forgot your password?
        <Link to="/app/reset-password">
          Reset it!
        </Link>
      </P>
    </LoginLinksStyle>
  )

  const signUpLink = (
    <LoginLinksStyle key="register">
      <P>
        Don't have an account?
        <Link to="/app/register">
          Sign up!
        </Link>
      </P>
    </LoginLinksStyle>
  )

  const loginLink = (
    <LoginLinksStyle key="login">
      <P>
        Already have an account?
        <Link to="/app/login">
          Login!
        </Link>
      </P>
    </LoginLinksStyle>
  )

  const loginRememberedLink = (
    <LoginLinksStyle key="login-remembered">
      <P>
        Remembered your password?
        <Link to="/app/login">
          Login!
        </Link>
      </P>
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
