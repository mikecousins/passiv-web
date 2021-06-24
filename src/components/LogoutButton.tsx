import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions';
import { LogoutButton as StyledLogoutButton } from '../styled/LogoutButton';

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <StyledLogoutButton onClick={() => dispatch(logout())}>
      Logout
    </StyledLogoutButton>
  );
};

export default LogoutButton;
