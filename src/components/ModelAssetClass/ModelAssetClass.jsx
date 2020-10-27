import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchAssetClasses,
  addAssetClass,
} from '../../actions/modelAssetClass';
import AssetClass from './AssetClass';
import Target from './Target';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import { Button } from '../../styled/Button';

const InputBox = styled.div`
  border: 1px solid #979797;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 0 30px 40px;
  margin: 20px;
`;

const ModelAssetClass = ({
  assetClasses,
  onFetchAssetClasses,
  onAddAssetClass,
}) => {
  useEffect(() => {
    onFetchAssetClasses();
  }, []);

  const handleBackBtn = () => {
    console.log('Handle Back button: ');
  };

  let assetClassBox = assetClasses.map((astClass) => {
    return (
      <InputBox>
        <AssetClass assetClass={astClass} />
        <Target assetClass={astClass} />
      </InputBox>
    );
  });

  return (
    <ShadowBox>
      {assetClassBox}
      <Button style={{ background: '#2833CB' }} onClick={onAddAssetClass}>
        + Add Asset Class
      </Button>
      <Button
        style={{
          background: 'transparent',
          border: '1px solid #2833CB',
          color: '#2833CB',
        }}
        onClick={handleBackBtn}
      >
        Back to Model Portfolio
      </Button>
    </ShadowBox>
  );
};

const mapStateToProps = (state) => {
  return {
    assetClasses: state.astClasses.listOfAssetClasses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAssetClasses: () => dispatch(fetchAssetClasses()),
    onAddAssetClass: () => dispatch(addAssetClass()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelAssetClass);
