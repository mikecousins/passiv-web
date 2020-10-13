import React from 'react';
import { H1, P } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import { AddAssetClass } from '../components/AssetClass/AddAssetClass';
const AssetClassPage = () => {
  return (
    <React.Fragment>
      <H1>Set up your asset classes</H1>
      <P>
        An asset class contains of an asset class title and the securities that
        will go into them.
        <br></br>
        Create your asset classes and add your securities.
      </P>
      <ShadowBox>
        <AddAssetClass />
      </ShadowBox>
    </React.Fragment>
  );
};

export default AssetClassPage;
