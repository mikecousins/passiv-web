import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectLoggedIn } from '../selectors';
import { selectIsMobile } from '../selectors/browser';
import { StyledTooltip } from '../styled/GlobalElements';

const SecureRoute = ({ component: Component, loggedIn, isMobile, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        let tooltip = null;
        if (isMobile) {
          tooltip = (
            <StyledTooltip
              place="right"
              clickable={true}
              effect="solid"
              type={'dark'}
              event={'click'}
            />
          );
        } else {
          tooltip = (
            <StyledTooltip
              place="right"
              clickable={true}
              effect="solid"
              type={'dark'}
            />
          );
        }
        return loggedIn ? (
          <React.Fragment>
            <Component {...routeProps} />
            {tooltip}
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
  isMobile: selectIsMobile(state),
});

SecureRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(select)(SecureRoute);
