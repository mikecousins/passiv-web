import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({ component, ...rest }) => {
  const isLoggedIn = true;

  return (
    <Route
      {...rest}
      render={props => (
        isLoggedIn ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { nextPathname: props.location.pathname },
            }}
          />
        )
      )}
    />
  );
};

SecureRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: Location,
};

SecureRoute.defaultProps = {
  location: null,
};

export default SecureRoute;