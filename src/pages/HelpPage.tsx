import React from 'react';
import Tutorial from '../components/Help/Tutorial';
import HelpHeader from '../components/Help/HelpHeader';

import SearchBar from '../components/Help/SearchBar';

import Grid from '../styled/Grid';
import AlgoliaSearch from '../components/Help/AlgoliaSearch';

const HelpPage = () => {
  return (
    <>
      <HelpHeader />
      <Grid columns="2fr 1fr">
        <SearchBar />
        {/* <AlgoliaSearch /> */}
        {/* <Tutorial /> */}
      </Grid>
    </>
  );
};

export default HelpPage;
