import React, { Component } from 'react';
import FAQ from '../components/Help/FAQ';
import ContactForm from '../components/Help/ContactForm';
import HelpHeader from '../components/Help/HelpHeader';

class HelpPage extends Component {
  render() {
    return (
      <React.Fragment>
        <HelpHeader />
        <ContactForm />
        <FAQ />
      </React.Fragment>
    );
  }
}

export default HelpPage;
