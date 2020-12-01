import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  ModelAssetClassDetailsType,
  ModelAssetClass,
} from '../../types/modelAssetClass';
import { selectModelAssetClasses } from '../../selectors/modelAssetClasses';
import ModelPortoflioBox from './ModelPortfolioBox';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ShadowBox from '../../styled/ShadowBox';
import Grid from '../../styled/Grid';
import AssetClassesBox from './AssetClassesBox';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import {
  selectModelPortfolio,
  selectCurrentModelPortfolioId,
} from '../../selectors/modelPortfolio';
import { loadModelPortfolio, loadModelPortfolios } from '../../actions';
import { deleteData } from '../../api';
import { SmallButton } from '../../styled/Button';

const BackButton = styled.div`
  padding: 30px 10px;
  margin-bottom: 20px;
  display: block;
  a {
    font-size: 20px;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: 2px;
    color: #033ebc;
    display: block;
    text-decoration: none;
  }
  @media (max-width: 900px) {
    margin-bottom: 50px;
    padding: 16px 20px 20px;
    text-align: center;
    width: 100%;
    border: 1px solid var(--brand-blue);
    display: inline-block;
    a {
      font-size: 18px;
    }
  }
`;

const ResponsiveGrid = styled(Grid)`
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DeleteContainer = styled.div`
  float: right;
`;

const ModelPortfolio = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const modelPortfolioId = useSelector(selectCurrentModelPortfolioId);

  useEffect(() => {
    dispatch(loadModelPortfolio({ id: modelPortfolioId }));
  }, [dispatch, modelPortfolioId]);

  const [deleteDialog, setDeleteDialog] = useState(false);

  const modelPortfolio: ModelPortfolioDetailsType | null = useSelector(
    selectModelPortfolio,
  );

  const modelAssetClasses: ModelAssetClassDetailsType[] = useSelector(
    selectModelAssetClasses,
  );

  const assetClasses: ModelAssetClass[] = modelAssetClasses.map((obj) => {
    return obj.model_asset_class;
  });

  const handleDeleteModel = () => {
    deleteData(
      `/api/v1/modelPortfolio/${modelPortfolio?.model_portfolio.id}`,
    ).then(() => {
      history.push('/app/setting-targets');
      dispatch(loadModelPortfolios());
    });
  };

  return (
    <>
      <ShadowBox>
        <BackButton>
          <Link to={'/app/setting-targets'}>
            <FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Setting
            Targets
          </Link>
        </BackButton>
        <ResponsiveGrid columns="4fr 2fr">
          {modelPortfolio && (
            <ModelPortoflioBox
              assetClasses={assetClasses}
              modelPortfolio={modelPortfolio}
            />
          )}

          <AssetClassesBox assetClasses={modelAssetClasses} />
        </ResponsiveGrid>
      </ShadowBox>
      <DeleteContainer>
        {deleteDialog ? (
          <>
            <SmallButton
              onClick={handleDeleteModel}
              style={{
                backgroundColor: 'transparent',
                color: 'black',
                fontWeight: 600,
              }}
            >
              Delete
            </SmallButton>
            <SmallButton
              onClick={() => setDeleteDialog(false)}
              style={{ fontWeight: 600 }}
            >
              Cancel
            </SmallButton>
          </>
        ) : (
          <button onClick={() => setDeleteDialog(true)}>
            <FontAwesomeIcon icon={faTrashAlt} /> Delete{' '}
            <span style={{ fontWeight: 600 }}>
              {modelPortfolio?.model_portfolio.name}
            </span>
          </button>
        )}
      </DeleteContainer>
    </>
  );
};

export default ModelPortfolio;
