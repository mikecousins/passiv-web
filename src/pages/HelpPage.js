import React, { Component } from 'react';
import FAQ from '../components/Help/FAQ';
import ContactForm from '../components/Help/ContactForm';
import HelpHeader from '../components/Help/HelpHeader';
import styled from '@emotion/styled';

class HelpPage extends Component {

  render() {
    return (
    <React.Fragment>
    	<HelpHeader/>
    	<ContactForm/>
    	<FAQ/>
    </React.Fragment>
    );
  }
};

export default HelpPage;
