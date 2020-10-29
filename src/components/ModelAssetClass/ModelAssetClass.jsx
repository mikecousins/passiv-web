import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postData } from '../../api';
import { selectModelAssetClasses } from '../../selectors/modelAssetClasses';
import { loadModelAssetClasses } from '../../actions';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import { Button } from '../../styled/Button';
import AssetClass from './AssetClass';
import Target from './Target';

const InputBox = styled.div`
  border: 1px solid #bfb6b6;
  max-width: 600px;
  box-sizing: border-box;
  padding: 30px;
  margin: 10px;
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
  const assetClasses = useSelector(selectModelAssetClasses);

  const handleAddAssetClass = () => {
    postData('/api/v1/modelAssetClass/', {})
      .then(() => {
        dispatch(loadModelAssetClasses());
      })
      .catch((error) => {
        // dispatch(fetchAccountsError(error))
        console.log(error);
      }); //!! Add needed error handler
  };
  const handleBackBtn = () => {
    console.log('Handle Back button: ');
  };

  let assetClassBox;

  if (assetClasses) {
    assetClassBox = assetClasses.map((astClass) => {
      return (
        <InputBox key={astClass.model_asset_class.id}>
          <AssetClass assetClass={astClass} />
          <Target assetClass={astClass} />
        </InputBox>
      );
    });
  }

  return (
    <ShadowBox>
      {assetClassBox}
      <div style={{ marginTop: '30px' }}>
        <Button onClick={handleAddAssetClass}>+ Add Asset Class</Button>
        <BackButton onClick={handleBackBtn}>Back to Model Portfolio</BackButton>
      </div>
    </ShadowBox>
  );
};

export default ModelAssetClass;
