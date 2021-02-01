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
import { loadModelPortfolios } from '../../actions';
import { deleteData, getData, postData } from '../../api';
import { Button, SmallButton } from '../../styled/Button';
import { selectCurrentModelPortfolio } from '../../selectors/modelPortfolios';
import { toast } from 'react-toastify';
import { selectRouter } from '../../selectors/router';

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
      history.push('/app/my-model-portfolios');
    });
  };
  const [sharedModel, setSharedModel] = useState(false);
  const router = useSelector(selectRouter);

  useEffect(() => {
    //@ts-ignore
    if (router && router.location) {
      const path = router.location.pathname.split('/');
      const shareId = path[5];
      if (path[4] === 'share' && shareId) {
        const modelId = router.location.pathname.split('/')[3];
        getData(
          //@ts-ignore
          `/api/v1/modelPortfolio/${modelId}/share/${shareId}`,
        )
          .then((res) => {
            setSharedModel(true);
            currentModelPortfolio = res.data;
          })
          .catch(() => {
            alert('Invalid Share Id');
          });
      }
    }
  }, [router]);
  return (
    <>
      {currentModelPortfolio && (
        <>
          <ShadowBox>
            {!sharedModel && (
              <BackButton>
                <Link to={'/app/my-model-portfolios'}>
                  <FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to My
                  Models
                </Link>
              </BackButton>
            )}

            <ResponsiveGrid columns="4fr 2fr">
              <ModelPortoflioBox
                assetClasses={assetClasses}
                modelPortfolio={currentModelPortfolio}
                sharedModel={sharedModel}
              />
              {currentModelPortfolio!.model_portfolio.model_type === 1 && (
                <AssetClassesBox assetClasses={modelAssetClasses} />
              )}
            </ResponsiveGrid>
          </ShadowBox>

          {!sharedModel && (
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
          )}
        </>
      )}
    </>
  );
};

export default ModelPortfolio;
