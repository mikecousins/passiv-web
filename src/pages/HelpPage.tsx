import React from 'react';
import { useSelector } from 'react-redux';
import FAQ from '../components/Help/FAQ';
import { Table } from '../styled/GlobalElements';
import Tutorial from '../components/Help/Tutorial';
import ContactForm from '../components/Help/ContactForm';
import HelpHeader from '../components/Help/HelpHeader';
import { selectShowInAppTour } from '../selectors/features';
import ResetTour from '../components/Help/ResetTour';

const HelpPage = () => {
  const showInAppTour = useSelector(selectShowInAppTour);
  return (
    <React.Fragment>
      <React.Fragment>
        <HelpHeader />
        <Table>
          <ContactForm />
          <Tutorial />
          {showInAppTour && <ResetTour />}
        </Table>
      </React.Fragment>
      <FAQ />
    </React.Fragment>
  );
};

export default HelpPage;
