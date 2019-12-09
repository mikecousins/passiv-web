import React from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import RegistrationPage from '../pages/RegistrationPage';

// hack to make routing work on both prod and dev
const prefixPath = (path: string) => {
  return `/app${path}`;
};

const InsecureApp = () => {
  const location = useLocation();
  return (
    <Switch>
      <Route path={prefixPath('/login')} component={LoginPage} />
      <Route path={prefixPath('/register')} component={RegistrationPage} />

      <Route
        path={prefixPath('/reset-password')}
        component={ResetPasswordPage}
      />
      <Route path="*">
        <Redirect to={prefixPath(`/login?next=${location.pathname}`)} />
      </Route>
    </Switch>
  );
};

export default InsecureApp;
