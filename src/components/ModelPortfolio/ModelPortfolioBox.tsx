import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListAssets from './ListAssets';
import NameInputAndEdit from '../NameInputAndEdit';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { postData } from '../../api';
import { ModelAssetClass } from '../../types/modelAssetClass';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { loadModelPortfolios } from '../../actions';

const Box = styled.div`
  border: 1px solid #bfb6b6;
  margin-right: 50px;
  padding: 10px;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    margin-right: 0;
  }
`;

const StyledContainer = styled.div`
  background: #fff;
  display: inline-block;
  position: relative;
  top: -24px;
  padding: 0 15px;
  margin-bottom: -7px;
`;

const StyledName = styled.span`
  font-weight: 600;
  font-size: 30px;
`;

type Props = {
  assetClasses: ModelAssetClass[];
  modelPortfolio: ModelPortfolioDetailsType;
  sharedModel: boolean;
};

const ModelPortoflioBox = ({
  assetClasses,
  modelPortfolio,
  sharedModel,
}: Props) => {
  const dispatch = useDispatch();
  const [modelPortfolioName, setModelPortfolioName] = useState(
    modelPortfolio.model_portfolio.name,
  );
  const [securityBased, setSecurityBased] = useState(
    modelPortfolio.model_portfolio.model_type === 0,
  );
  const [editName, setEditName] = useState(false);

  // const getAvailableAssetClasses = () => {
  //   const usedAssetClasses = model.map((astCls) => {
  //     return astCls.model_asset_class.id;
  //   });
  //   // filter out the asset classes that have been already added to the model portfolio from the available asset classes
  //   const assetClassesAvailable = assetClasses.filter(
  //     (ast) => !usedAssetClasses.includes(ast.id),
  //   );

  //   return assetClassesAvailable;
  // };

  const changeModel = () => {
    postData(
      `/api/v1/modelPortfolio/${modelPortfolio.model_portfolio.id}`,
      modelPortfolio,
    )
      .then(() => {
        dispatch(loadModelPortfolios());
      })
      .catch(() => {
        dispatch(loadModelPortfolios());
        toast.error(
          `${modelPortfolio.model_portfolio.name} Model Portfolio Name Update Failed`,
          { autoClose: 3000 },
        );
      });
  };
  const finishEditingName = () => {
    if (
      modelPortfolioName !== modelPortfolio.model_portfolio.name &&
      modelPortfolioName!.trim().length > 0
    ) {
      modelPortfolio.model_portfolio.name = modelPortfolioName;
      changeModel();
    } else {
      setModelPortfolioName(modelPortfolio.model_portfolio.name);
    }
    setEditName(false);
  };

  return (
    <Box>
      <NameInputAndEdit
        value={modelPortfolioName}
        edit={editName}
        allowEdit={!sharedModel}
        editBtnTxt={'Edit Name'}
        onChange={(e: any) => setModelPortfolioName(e.target.value)}
        onKeyPress={(e: any) => e.key === 'Enter' && finishEditingName()}
        onClickDone={() => finishEditingName()}
        onClickEdit={() => setEditName(true)}
        StyledName={StyledName}
        StyledContainer={StyledContainer}
      />

      <ListAssets
        modelPortfolio={modelPortfolio}
        securityBased={securityBased}
      />
    </Box>
  );
};

export default ModelPortoflioBox;
