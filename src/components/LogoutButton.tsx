import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions';
import { LogoutButton as StyledLogoutButton } from '../styled/LogoutButton';

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <StyledLogoutButton onClick={() => dispatch(logout())}>
      Logout <FontAwesomeIcon icon={faSignOutAlt} />
    </StyledLogoutButton>
  );
};

export default LogoutButton;
