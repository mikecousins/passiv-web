import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HelpArticlePage from '../pages/HelpArticlePage';
import HelpPage from '../pages/HelpPage';
import ResetPasswordConfirmPage from '../pages/ResetPasswordConfirmPage';

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
  </Switch>
);

export default CommonRoutes;
