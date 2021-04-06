import React from 'react';
import Tutorial from '../components/Help/Tutorial';
import HelpHeader from '../components/Help/HelpHeader';

import SearchBar from '../components/Help/SearchBar';

import Grid from '../styled/Grid';

const HelpPage = () => {
  return (
    <>
      <HelpHeader />
      <Grid columns="4fr 2fr">
        <SearchBar />
        <Tutorial />
      </Grid>
    </>
  );
};

export default HelpPage;
