import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import {
  selectModelPortfolio,
  selectCurrentModelPortfolioId,
} from '../../selectors/modelPortfolio';
import { loadModelPortfolio } from '../../actions';

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
  const dispatch = useDispatch();

  const modelPortfolioId = useSelector(selectCurrentModelPortfolioId);

  useEffect(() => {
    dispatch(loadModelPortfolio({ id: modelPortfolioId }));
  }, []);

  const modelPortfolio: ModelPortfolioDetailsType | null = useSelector(
    selectModelPortfolio,
  );

  const modelAssetClasses: ModelAssetClassDetailsType[] = useSelector(
    selectModelAssetClasses,
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
        {modelPortfolio ? (
          <ModelPortoflioBox
            assetClasses={assetClasses}
            modelPortfolio={modelPortfolio}
          />
        ) : null}

        <AssetClassesBox assetClasses={modelAssetClasses} />
      </ResponsiveGrid>
    </ShadowBox>
  );
};

export default ModelPortfolio;
