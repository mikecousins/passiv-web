import React, { Component } from 'react';
import { connect } from 'react-redux';
import FAQ from '../components/Help/FAQ';
import ContactForm from '../components/Help/ContactForm';
import HelpHeader from '../components/Help/HelpHeader';
import { selectLoggedIn } from '../selectors';

class HelpPage extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.loggedIn && (
          <React.Fragment>
            <HelpHeader />
            <ContactForm />
          </React.Fragment>
        )}
        <FAQ />
      </React.Fragment>
    );
  }
}

const actions = {};

const select = state => ({
  loggedIn: selectLoggedIn(state),
});

export default connect(
  select,
  actions,
)(HelpPage);
