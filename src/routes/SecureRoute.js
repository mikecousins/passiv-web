import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectLoggedIn } from '../selectors';

const SecureRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => (
        loggedIn ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { nextPathname: routeProps.location.pathname },
            }}
          />
        )
      )}
    />
  );
};

const select = (state) => ({
  loggedIn: selectLoggedIn(state),
});

SecureRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: Location,
};

SecureRoute.defaultProps = {
  location: null,
};

export default connect(select)(SecureRoute);
