import React from 'react';
import { H1 } from '../styled/GlobalElements';
import ModelPortfolio from '../components/ModelPortfolio/ModelPortfolio';
import { StyledP } from './ModelAssetClassPage';

const ModelPortfolioPage = () => {
  return (
    <React.Fragment>
      <H1>Model Portfolio</H1>
      <StyledP>
        Create a model portfolio by using asset classes you define. Once you're
        done you can apply it to one of your portfolio groups, share with your
        friends or use later.
      </StyledP>
      <ModelPortfolio />
    </React.Fragment>
  );
};

export default ModelPortfolioPage;
