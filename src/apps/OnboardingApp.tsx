import React from 'react';
import { Route } from 'react-router-dom';
import QuestradeAuthorizationPicker from '../components/QuestradeAuthorizationPicker';

// hack to make routing work on both prod and dev
const prefixPath = (path: string) => {
  return `/app${path}`;
};

const InsecureApp = () => (
  <React.Fragment>
    <Route path={prefixPath('/connect')}>
      <QuestradeAuthorizationPicker />
    </Route>
  </React.Fragment>
);

export default InsecureApp;
