import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const prefixPath = (path: string) => {
  return `/app${path}`;
};

const OauthRoutes = () => <Switch></Switch>;

export default OauthRoutes;
