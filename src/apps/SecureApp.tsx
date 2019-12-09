import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';

// hack to make routing work on both prod and dev
const prefixPath = (path: string) => {
  return `/app${path}`;
};

const SecureApp = () => {
  return <React.Fragment></React.Fragment>;
};

export default SecureApp;
