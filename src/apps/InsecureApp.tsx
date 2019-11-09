import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ResetPasswordConfirmPage from '../pages/ResetPasswordConfirmPage';
import RegistrationPage from '../pages/RegistrationPage';
import DemoLoginPage from '../pages/DemoLoginPage';

// hack to make routing work on both prod and dev
const prefixPath = (path: string) => {
  return `/app${path}`;
};

const InsecureApp = () => (
  <Switch>
    <Route path={prefixPath('/login')} component={LoginPage} />
    <Route path={prefixPath('/register')} component={RegistrationPage} />
    <Route path={prefixPath('/demo')} component={DemoLoginPage} />
    <Route path={prefixPath('/reset-password')} component={ResetPasswordPage} />
    <Route
      path={prefixPath('/reset-password-confirm/:token')}
      component={ResetPasswordConfirmPage}
    />
    <Route path="*">
      <Redirect to={prefixPath('/login')} />
    </Route>
  </Switch>
);

export default InsecureApp;
