import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModelAssetClass } from '../../types/modelAssetClass';
import NameInputAndEdit from '../NameInputAndEdit';
import AssetClassSelector from './AssetClassSelector';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { postData } from '../../api';
import { loadModelPortfolios } from '../../actions';
import { Formik, Form } from 'formik';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import ListAssets from './ListAssets';

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

export const FormContainer = styled.div`
  border-bottom: 1px solid var(--brand-blue);
  margin-top: 20px;
`;

export const Percentage = styled.div`
  display: inline-block;
  border-right: 1px solid var(--brand-blue);
  @media (max-width: 740px) {
    margin-bottom: 10px;
  }
`;

export const PercentageLabel = styled.label`
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
  margin-right: 10px;
`;

export const PercentageInput = styled.input`
  max-width: 70px;
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
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
  const [notAssetError, setNotAssetError] = useState(false);

  let model: any[] = modelPortfolio.model_portfolio_asset_class;
  if (securityBased) {
    model = modelPortfolio.model_portfolio_security;
  }
  const nameChanged =
    modelPortfolio.model_portfolio.name.trim() !== modelPortfolioName.trim();

  // console.log('name changed?', nameChanged);

  const getAvailableAssetClasses = () => {
    const usedAssetClasses = model.map((astCls) => {
      return astCls.model_asset_class.id;
    });
    // filter out the asset classes that have been already added to the model portfolio from the available asset classes
    const assetClassesAvailable = assetClasses.filter(
      (ast) => !usedAssetClasses.includes(ast.id),
    );

    return assetClassesAvailable;
  };

  const getRemainingPercent = () => {
    //@ts-ignore
    const allocatedPercent = model.reduce((sum: number, asset: any) => {
      return (+sum + +asset.percent).toFixed(3);
    }, '0');
    return (100 - +allocatedPercent).toFixed(3);
  };

  // remove the error after 5 seconds
  useEffect(() => {
    setTimeout(() => setNotAssetError(false), 5000);
  }, [notAssetError]);

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
      <ul
        style={{
          margin: '40px 20px',
        }}
      >
        <li
          style={{
            borderLeft: '5px solid var(--brand-green)',
            lineHeight: '30px',
            padding: '10px',
            marginBottom: '20px',
          }}
          key="cash"
        >
          <span style={{ fontSize: '26px', fontWeight: 900 }}>
            {getRemainingPercent()}% Cash
          </span>
        </li>
        <ListAssets model={model} securityBased={securityBased} />
      </ul>
      {/* {!sharedModel && (
        <FormContainer>
          <Formik
            initialValues={{
              assetId: '',
              percent: 0,
            }}
            initialStatus={{ submitted: false }}
            onSubmit={(values, actions) => {
              if (securityBased) {
                modelPortfolio.model_portfolio_security.push({
                  symbol: {
                    id: values.assetId!,
                  },
                  percent: values.percent.toFixed(3),
                });
              } else {
                modelPortfolio.model_portfolio_asset_class.push({
                  model_asset_class: {
                    id: values.assetId!,
                  },
                  percent: values.percent.toFixed(3),
                });
              }
              postData(
                `/api/v1/modelPortfolio/${modelPortfolio.model_portfolio.id}`,
                modelPortfolio,
              )
                .then(() => {
                  dispatch(loadModelPortfolios());
                  actions.resetForm();
                })
                .catch(() => {
                  dispatch(loadModelPortfolios());
                  getRemainingPercent();
                  setNotAssetError(true);
                  actions.resetForm();
                });
              actions.setSubmitting(false);
              actions.setStatus({ submitted: true });
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Percentage>
                  <PercentageInput
                    id="percent"
                    name="percent"
                    type="number"
                    onChange={props.handleChange}
                    value={props.values.percent}
                    required
                  />
                  <PercentageLabel htmlFor="percentage">%</PercentageLabel>
                </Percentage>
                {securityBased ? (
                  <SymbolSelector
                    name="assetId"
                    id="assetId"
                    value={null}
                    onSelect={props.handleChange}
                    allSymbols={true}
                    forModelSecurity={true}
                  />
                ) : (
                  <AssetClassSelector
                    name="assetId"
                    id="assetId"
                    assetClassesAvailable={getAvailableAssetClasses()}
                    onSelect={props.handleChange}
                  />
                )}
                <button type="submit" style={{ display: 'none' }}></button>
              </Form>
            )}
          </Formik>
        </FormContainer>
      )}

      {notAssetError && (
        <span style={{ color: 'red', padding: 'inherit' }}>
          Please select from the list of available asset classes and try again.
        </span>
      )} */}
    </Box>
  );
};

export default ModelPortoflioBox;
