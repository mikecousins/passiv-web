import React from 'react';
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
  @media (max-width: 900px) {
    margin-bottom: 50px;
    text-align: center;
  }
`;

const ResponsiveGrid = styled(Grid)`
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
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
  return (
    <ShadowBox>
      <BackButton>
        <Link to={'/'}>
          <FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to ...
        </Link>
      </BackButton>
      <ResponsiveGrid columns="4fr 2fr">
        <ModelPortoflioBox
          assetClasses={assetClasses}
          modelPortfolio={modelPortfolio}
        />
        <AssetClassesBox assetClasses={modelAssetClasses} />
      </ResponsiveGrid>
    </ShadowBox>
  );
};

export default ModelPortfolio;
