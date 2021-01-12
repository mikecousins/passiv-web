import React from 'react';
import { useSelector } from 'react-redux';
import FAQ from '../components/Help/FAQ';
import { Table } from '../styled/GlobalElements';
import Tutorial from '../components/Help/Tutorial';
import ContactForm from '../components/Help/ContactForm';
import HelpHeader from '../components/Help/HelpHeader';
import { selectShowInAppTour } from '../selectors/features';
import ResetTour from '../components/Help/ResetTour';
import SearchBar from '../components/Help/SearchBar';
import CollapseBox from '../components/Help/CollapseBox';

const HelpPage = () => {
  const showInAppTour = useSelector(selectShowInAppTour);
  return (
    <React.Fragment>
      <React.Fragment>
        <SearchBar />
      </React.Fragment>
      <CollapseBox
        title="Can't find what you're looking for? Send us a message!"
        content={<ContactForm />}
      />
      <Table>
        <Tutorial />
        {showInAppTour && <ResetTour />}
      </Table>
    </React.Fragment>
  );
};

export default HelpPage;
