import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HelpArticlePage from '../pages/HelpArticlePage';
import HelpPage from '../pages/HelpPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ResetPasswordConfirmPage from '../pages/ResetPasswordConfirmPage';

const prefixPath = (path: string) => {
  return `/app${path}`;
};

const CommonRoutes = () => (
  <React.Fragment>
    <Route path={prefixPath('/help/topic/:slug')} component={HelpArticlePage} />
    <Route path={prefixPath('/help')} component={HelpPage} />
    <Route path={prefixPath('/reset-password')} component={ResetPasswordPage} />
    <Route
      path={prefixPath('/reset-password-confirm/:token')}
      component={ResetPasswordConfirmPage}
    />
  </React.Fragment>
);

export default CommonRoutes;
