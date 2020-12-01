import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postData } from '../../api';
import { ModelAssetClassDetailsType } from '../../types/modelAssetClass';
import { selectModelAssetClasses } from '../../selectors/modelAssetClasses';
import { loadModelAssetClasses } from '../../actions';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import { Button } from '../../styled/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AssetClass from './AssetClass';
import Target from './Target';

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

const BackButton = styled(Button)`
  background: transparent;
  border: 1px solid var(--brand-blue);
  color: var(--brand-blue);
  @media (max-width: 900px) {
    margin-top: 10px;
  }
`;

const ModelAssetClass = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
      {assetClassBox}
      <div style={{ marginTop: '30px' }}>
        <Button onClick={handleAddAssetClass}>
          {' '}
          <FontAwesomeIcon
            icon={faPlus}
            size="sm"
            style={{ position: 'relative' }}
          />{' '}
          Add Asset Class
        </Button>
        <BackButton onClick={() => history.push('/')}>
          Back to Model Portfolio
        </BackButton>
      </div>
    </ShadowBox>
  );
};

export default ModelAssetClass;
