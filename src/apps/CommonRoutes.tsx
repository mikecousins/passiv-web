import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HelpArticlePage from '../pages/HelpArticlePage';
import HelpPage from '../pages/HelpPage';

const prefixPath = (path: string) => {
  return `/app${path}`;
};

const CommonRoutes = () => (
  <Switch>
    <Route path={prefixPath('/help/topic/:slug')} component={HelpArticlePage} />
    <Route path={prefixPath('/help')} component={HelpPage} />
  </Switch>
);

export default CommonRoutes;
