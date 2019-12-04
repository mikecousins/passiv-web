import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HelpArticlePage from '../pages/HelpArticlePage';
import HelpPage from '../pages/HelpPage';
import ResetPasswordConfirmPage from '../pages/ResetPasswordConfirmPage';
import DemoLoginPage from '../pages/DemoLoginPage';

const prefixPath = (path: string) => {
  return `/app${path}`;
};

const CommonRoutes = () => (
  <Switch>
    <Route path={prefixPath('/reset-password-confirm/:token')}>
      <ResetPasswordConfirmPage />
    </Route>
    <Route path={prefixPath('/help/topic/:slug')}>
      <HelpArticlePage />
    </Route>
    <Route path={prefixPath('/help')}>
      <HelpPage />
    </Route>
    <Route path={prefixPath('/demo')} component={DemoLoginPage} />
  </Switch>
);

export default CommonRoutes;
