import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Table } from '../styled/GlobalElements';
import Tutorial from '../components/Help/Tutorial';
import FAQ from '../components/Help/FAQ';
import ContactForm from '../components/Help/ContactForm';
import HelpHeader from '../components/Help/HelpHeader';
import { selectLoggedIn, selectHelpArticles } from '../selectors';

class HelpPage extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.loggedIn && (
          <React.Fragment>
            <HelpHeader />
            <Table>
              <ContactForm />
              <Tutorial />
            </Table>
          </React.Fragment>
        )}

        <FAQ />
      </React.Fragment>
    );
  }
}

const actions = {
  push: push,
};

const select = state => ({
  loggedIn: selectLoggedIn(state),
  articles: selectHelpArticles(state),
});

export default connect(
  select,
  actions,
)(HelpPage);
