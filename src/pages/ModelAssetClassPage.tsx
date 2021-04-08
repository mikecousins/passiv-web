import React from 'react';
import { H1, P } from '../styled/GlobalElements';
import ModelAssetClass from '../components/ModelAssetClass/ModelAssetClass';
import styled from '@emotion/styled';

export const StyledP = styled(P)`
  max-width: 50%;
  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

const AssetClassPage = () => {
  return (
    <React.Fragment>
      <H1>Set up your asset classes</H1>
      <StyledP>
        An asset class contains of an asset class title and the securities that
        will go into them. Create your asset classes and add your securities.
      </StyledP>
      <ModelAssetClass />
    </React.Fragment>
  );
};

export default AssetClassPage;
