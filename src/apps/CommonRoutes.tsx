import React from 'react';
import { Route } from 'react-router-dom';
import HelpArticlePage from '../pages/HelpArticlePage';
import HelpPage from '../pages/HelpPage';

const prefixPath = (path: string) => {
  return `/app${path}`;
};

const InsecureApp = () => (
  <React.Fragment>
    <Route path={prefixPath('/help/topic/:slug')} component={HelpArticlePage} />
    <Route path={prefixPath('/help')} component={HelpPage} />
  </React.Fragment>
);

export default InsecureApp;
