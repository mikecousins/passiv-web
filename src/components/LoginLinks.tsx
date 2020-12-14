import React from 'react';
import styled from '@emotion/styled';
import { P } from '../styled/GlobalElements';
import PreLoadLink from './PreLoadLink';
import { LOGIN_PATH, REGISTER_PATH, RESET_PASSWORD_PATH } from '../apps/Paths';

const LoginLinksStyle = styled.div`
  margin: 15px 0;
  a {
    color: var(--brand-blue);
    margin-left: 10px;
  }
`;

type Props = {
  page: string;
};

const LoginLinks = ({ page }: Props) => {
  let links = [];

  const resetLink = (
    <LoginLinksStyle key="reset">
      <P>
        Forgot your password?
        <PreLoadLink path={RESET_PASSWORD_PATH}>Reset it!</PreLoadLink>
      </P>
    </LoginLinksStyle>
  );

  const signUpLink = (
    <LoginLinksStyle key="register">
      <P>
        Don't have an account?
        <PreLoadLink path={REGISTER_PATH}>Sign up!</PreLoadLink>
      </P>
    </LoginLinksStyle>
  );

  const loginLink = (
    <LoginLinksStyle key="login">
      <P>
        Already have an account?
        <PreLoadLink path={LOGIN_PATH}>Login!</PreLoadLink>
      </P>
    </LoginLinksStyle>
  );

  const loginRememberedLink = (
    <LoginLinksStyle key="login-remembered">
      <P>
        Remembered your password?
        <PreLoadLink path={LOGIN_PATH}>Login!</PreLoadLink>
      </P>
    </LoginLinksStyle>
  );

  switch (page) {
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

  return <React.Fragment>{links}</React.Fragment>;
};

export default LoginLinks;
