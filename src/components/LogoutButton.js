import React from 'react';
import { connect } from 'react-redux';
import { logoutStartedAsync } from '../actions';
import { LogoutButton as StyledLogoutButton } from '../styled/LogoutButton';

export const LogoutButton = (props) => (
  <StyledLogoutButton onClick={props.startLogout}>
    Logout
  </StyledLogoutButton>
);

const actions = { startLogout: logoutStartedAsync };

export default connect(null, actions)(LogoutButton);
