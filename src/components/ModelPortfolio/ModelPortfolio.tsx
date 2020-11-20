import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ModelAssetClassDetailsType,
  ModelAssetClass,
} from '../../types/modelAssetClass';
import { selectModelAssetClasses } from '../../selectors/modelAssetClasses';
import ModelPortoflioBox from './ModelPortfolioBox';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import ShadowBox from '../../styled/ShadowBox';
import Grid from '../../styled/Grid';
import { ViewBtn } from '../../styled/Group';
import AssetClassesBox from './AssetClassesBox';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { selectModelPortfolio } from '../../selectors/modelPortfolio';

const BackButton = styled(ViewBtn)`
  padding: 30px 10px;
  margin-bottom: 20px;
`;

const ModelPortfolio = () => {
  const modelAssetClasses: ModelAssetClassDetailsType[] = useSelector(
    selectModelAssetClasses,
  );

  const modelPortfolio: ModelPortfolioDetailsType = useSelector(
    selectModelPortfolio,
  );

  let assetClasses: ModelAssetClass[] = modelAssetClasses.map((obj) => {
    return obj.model_asset_class;
  });

  const usedAssetClasses = modelPortfolio.model_portfolio_asset_class.map(
    (astcls) => {
      return astcls.model_asset_class.id;
    },
  );

  const allocatedPercent = modelPortfolio.model_portfolio_asset_class.reduce(
    (sum, astcls) => {
      return sum + astcls.percent;
    },
    0,
  );

  // filter out the asset classes that have been already added to the model portfolio from the available asset classes
  assetClasses = assetClasses.filter(
    (ast) => !usedAssetClasses.includes(ast.id),
  );

  return (
    <ShadowBox>
      <BackButton>
        <Link to={'/'}>
          <FontAwesomeIcon icon={faAngleLeft} /> Back to ...
        </Link>
      </BackButton>
      <Grid columns="4fr 2fr">
        <ModelPortoflioBox
          assetClasses={assetClasses}
          modelPortfolio={modelPortfolio}
          allocatedPercent={allocatedPercent}
        />
        <AssetClassesBox assetClasses={modelAssetClasses} />
      </Grid>
    </ShadowBox>
  );
};

export default ModelPortfolio;
