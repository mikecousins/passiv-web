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

const BackButton = styled(ViewBtn)`
  padding: 30px 10px;
  margin-bottom: 20px;
`;

const ModelPortfolio = () => {
  const modelAssetClasses: ModelAssetClassDetailsType[] = useSelector(
    selectModelAssetClasses,
  );

  const assetClasses: ModelAssetClass[] = modelAssetClasses.map((obj) => {
    return obj.model_asset_class;
  });

  return (
    <ShadowBox>
      <BackButton>
        <Link to={'/'}>
          <FontAwesomeIcon icon={faAngleLeft} /> Back to ...
        </Link>
      </BackButton>
      <Grid columns="4fr 2fr">
        <ModelPortoflioBox assetClasses={assetClasses} />
        <AssetClassesBox assetClasses={modelAssetClasses} />
      </Grid>
    </ShadowBox>
  );
};

export default ModelPortfolio;
