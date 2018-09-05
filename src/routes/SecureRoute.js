import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const SecureRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        props.loggedIn ? (
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

const select = (state) => ({
  loggedIn: state.auth.loggedIn, 
});

SecureRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: Location,
};

SecureRoute.defaultProps = {
  location: null,
};

export default connect(select)(SecureRoute);
