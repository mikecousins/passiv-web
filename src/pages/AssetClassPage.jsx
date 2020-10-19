import React, { useState, useEffect } from 'react';
import { H1, P } from '../styled/GlobalElements';
import AssetClasses from '../components/AssetClass/AssetClasses';
const AssetClassPage = () => {
  const [someState, setSomeState] = useState();
  useEffect(() => {
    setSomeState('x');
  }, []);

  return (
    <React.Fragment>
      <H1>Set up your asset classes</H1>
      <P>
        An asset class contains of an asset class title and the securities that
        will go into them.
        <br></br>
        Create your asset classes and add your securities.
      </P>
      <AssetClasses />
    </React.Fragment>
  );
};

export default AssetClassPage;
