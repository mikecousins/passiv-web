import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { postData } from '../../api';
import { ModelAssetClassDetailsType } from '../../types/modelAssetClass';
import { selectModelAssetClasses } from '../../selectors/modelAssetClasses';
import { loadModelAssetClasses } from '../../actions';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import { Button, TransparentButton } from '../../styled/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AssetClass from './AssetClass';
import Target from './Target';
import { selectRouter } from '../../selectors/router';
import Tour from '../Tour/Tour';
import { AssetClassesSteps } from '../Tour/TourSteps';
import NotAvailable from '../NotAvailable';

const AssetBox = styled.div`
  border: 1px solid #bfb6b6;
  max-width: 700px;
  box-sizing: border-box;
  padding: 20px;
  margin: 10px;
  letter-spacing: 0.28px;
  line-height: 36px;
  @media (max-width: 900px) {
    margin: 0;
    padding: 20px;
  }
`;

const BackButton = styled(TransparentButton)`
  @media (max-width: 900px) {
    margin-top: 10px;
  }
`;

const ModelAssetClass = () => {
  const dispatch = useDispatch();
  const router = useSelector(selectRouter);
  const back = router?.location?.query.back;

  const assetClasses: ModelAssetClassDetailsType[] = useSelector(
    selectModelAssetClasses,
  );

  const handleAddAssetClass = () => {
    postData('/api/v1/modelAssetClass/', {})
      .then(() => {
        dispatch(loadModelAssetClasses());
      })
      .catch((error) => {
        dispatch(loadModelAssetClasses());
      });
  };

  let assetClassBox;

  if (assetClasses) {
    assetClassBox = assetClasses.map((astClass: ModelAssetClassDetailsType) => {
      return (
        <AssetBox key={astClass.model_asset_class.id}>
          <AssetClass assetClass={astClass} />
          <Target assetClass={astClass} />
        </AssetBox>
      );
    });
  }

  return (
    <ShadowBox>
      <Tour steps={AssetClassesSteps} name="asset_classes_page_tour" />
      {assetClasses.length > 0 ? (
        assetClassBox
      ) : (
        <NotAvailable message="There are currently no asset classes available." />
      )}

      <div style={{ marginTop: '40px' }} className="tour-asset-class">
        <Button onClick={handleAddAssetClass}>
          {' '}
          <FontAwesomeIcon icon={faPlus} size="sm" /> New Asset Class
        </Button>

        <BackButton onClick={() => dispatch(push(`${back}`))}>
          Back to Model Portfolio
        </BackButton>
      </div>
    </ShadowBox>
  );
};

export default ModelAssetClass;
