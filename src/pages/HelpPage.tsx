import React from 'react';
import FAQ from '../components/Help/FAQ';
import { Table } from '../styled/GlobalElements';
import Tutorial from '../components/Help/Tutorial';
import ContactForm from '../components/Help/ContactForm';
import HelpHeader from '../components/Help/HelpHeader';
import Tour from '../components/Help/ResetTour';

const HelpPage = () => {
  return (
    <React.Fragment>
      <React.Fragment>
        <HelpHeader />
        <Table>
          <ContactForm />
          <Tutorial />
          <Tour />
        </Table>
      </React.Fragment>
      <FAQ />
    </React.Fragment>
  );
};

export default HelpPage;
