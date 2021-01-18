import React, { useState } from 'react';
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
import { loadModelPortfolios } from '../../actions';
import { deleteData, postData } from '../../api';
import { Button, SmallButton } from '../../styled/Button';
import ModelSecurity from './ModelSecurity';
import { selectCurrentModelPortfolio } from '../../selectors/modelPortfolios';
import { toast } from 'react-toastify';

export const BackButton = styled.div`
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

const UseAssetClassBtn = styled(Button)``;

const ModelPortfolio = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [deleteDialog, setDeleteDialog] = useState(false);

  let currentModelPortfolio: ModelPortfolioDetailsType | null = useSelector(
    selectCurrentModelPortfolio,
  );

  const modelAssetClasses: ModelAssetClassDetailsType[] = useSelector(
    selectModelAssetClasses,
  );

  const assetClasses: ModelAssetClass[] = modelAssetClasses.map((obj) => {
    return obj.model_asset_class;
  });

  const handleDeleteModel = () => {
    deleteData(
      `/api/v1/modelPortfolio/${currentModelPortfolio!?.model_portfolio.id}`,
    ).then(() => {
      dispatch(loadModelPortfolios());
      history.push('/app/setting-targets');
    });
  };

  const handleUseAssetClass = () => {
    if (currentModelPortfolio !== null) {
      currentModelPortfolio.model_portfolio.model_type = 1;
      postData(
        `/api/v1/modelPortfolio/${currentModelPortfolio!?.model_portfolio.id}`,
        currentModelPortfolio,
      )
        .then(() => {
          dispatch(loadModelPortfolios());
        })
        .catch(() => {
          toast.error('Unable to use asset classes for this model.', {
            autoClose: 3000,
          });
        });
    }
  };

  return (
    <>
      {currentModelPortfolio && (
        <>
          <ShadowBox>
            <BackButton>
              <Link to={'/app/my-model-portfolios'}>
                <FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to My
                Models
              </Link>
            </BackButton>
            <ResponsiveGrid columns="4fr 2fr">
              {currentModelPortfolio!.model_portfolio.model_type === 1 ? (
                <ModelPortoflioBox
                  assetClasses={assetClasses}
                  modelPortfolio={currentModelPortfolio}
                />
              ) : (
                <ModelSecurity modelPortfolio={currentModelPortfolio} />
              )}
              {currentModelPortfolio!.model_portfolio.model_type === 1 && (
                <AssetClassesBox assetClasses={modelAssetClasses} />
              )}
            </ResponsiveGrid>
            {currentModelPortfolio!.model_portfolio.model_type === 0 &&
              currentModelPortfolio!.model_portfolio_security.length === 0 && (
                <UseAssetClassBtn onClick={handleUseAssetClass}>
                  Use Asset Classes
                </UseAssetClassBtn>
              )}
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
                  {currentModelPortfolio!.model_portfolio.name}
                </span>
              </button>
            )}
          </DeleteContainer>
        </>
      )}
    </>
  );
};

export default ModelPortfolio;
