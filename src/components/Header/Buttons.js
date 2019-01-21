import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import RefreshButton from '../RefreshButton';
import Button from '../LogoutButton';

import styled from '@emotion/styled';
import { selectLoggedIn } from '../../selectors';


const Buttons = (props) => {

  if (props.loggedIn) {
    return (
    <div>
      <RefreshButton />
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





