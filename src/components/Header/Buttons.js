import React from 'react';
import { connect } from 'react-redux';
import LogoutButton from '../LogoutButton';

import { selectLoggedIn } from '../../selectors';


const Buttons = (props) => {

  if (props.loggedIn) {
    return (
    <div>
      <LogoutButton />
    </div>
    );
  }
  return (
    <div></div>
  );
}

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

export default connect(select)(Buttons);
