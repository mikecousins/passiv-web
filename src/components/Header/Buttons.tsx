import React from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from '../LogoutButton';
import { selectLoggedIn } from '../../selectors';

const Buttons = () => {
  const loggedIn = useSelector(selectLoggedIn);
  if (loggedIn) {
    return <LogoutButton />;
  }
  return null;
};

export default Buttons;
