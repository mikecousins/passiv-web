import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectLoggedIn } from '../selectors';

const SecureRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
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

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

SecureRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(select)(SecureRoute);
