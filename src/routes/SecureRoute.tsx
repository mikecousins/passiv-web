import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectLoggedIn } from '../selectors';
import { AppState } from '../store';

interface Props {
  component: any;
  loggedIn: boolean;
  path: string;
}

const SecureRoute = ({
  component: Component,
  loggedIn,
  path,
  ...rest
}: Props) => {
  return (
    <Route
      path={path}
      {...rest}
      render={routeProps => {
        return loggedIn ? (
          <React.Fragment>
            <Component {...routeProps} />
          </React.Fragment>
        ) : (
          <Redirect
            to={{
              pathname: '/app/login',
              state: { nextPathname: routeProps.location.pathname },
            }}
          />
        );
      }}
    />
  );
};

const select = (state: AppState) => ({
  loggedIn: selectLoggedIn(state),
});

export default connect(select)(SecureRoute);
