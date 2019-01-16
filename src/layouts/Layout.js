import React from 'react';
import { connect } from 'react-redux';
import AppLayout from './AppLayout';
import { selectLoggedIn } from '../selectors';

const Layout = (props) => {
  // if (props.loggedIn) {
    return (
      <AppLayout>
        {props.children}
      </AppLayout>
    );

  // }
  // return (
  //   <MarketingLayout>
  //     {props.children}
  //   </MarketingLayout>
  // );
}

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

export default connect(select)(Layout);
