import React, { useState, useEffect } from 'react';
import { ModelAssetClass } from '../../types/modelAssetClass';
import NameInputAndEdit from '../NameInputAndEdit';
import AssetClassSelector from './AssetClassSelector';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { postData } from '../../api';
import { useDispatch } from 'react-redux';
import { loadModelPortfolios } from '../../actions';
import { Formik, Form } from 'formik';

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

const FormContainer = styled.div`
  border-bottom: 1px solid var(--brand-blue);
  margin: 20px;
`;

const Percentage = styled.div`
  display: inline-block;
  @media (max-width: 740px) {
    margin-bottom: 10px;
  }
`;

const PercentageLabel = styled.label`
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
  margin-right: 10px;
`;

const PercentageInput = styled.input`
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
};

const ModelPortoflioBox = ({ assetClasses, modelPortfolio }: Props) => {
  const dispatch = useDispatch();
  const [modelPortfolioName, setModelPortfolioName] = useState(
    modelPortfolio.model_portfolio.name,
  );
  const [editName, setEditName] = useState(false);
  const [notAssetError, setNotAssetError] = useState(false);

  const getAvailableAssetClasses = () => {
    const usedAssetClasses = modelPortfolio.model_portfolio_asset_class.map(
      (astCls) => {
        return astCls.model_asset_class.id;
      },
    );
    // filter out the asset classes that have been already added to the model portfolio from the available asset classes
    const assetClassesAvailable = assetClasses.filter(
      (ast) => !usedAssetClasses.includes(ast.id),
    );

    return assetClassesAvailable;
  };

  const getRemainingPercent = () => {
    const allocatedPercent = modelPortfolio.model_portfolio_asset_class.reduce(
      (sum, astCls) => {
        return (+sum + +astCls.percent).toFixed(3);
      },
      '0',
    );
    return (100 - +allocatedPercent).toFixed(3);
  };

  // remove the error after 5 seconds
  useEffect(() => {
    setTimeout(() => setNotAssetError(false), 5000);
  }, [notAssetError]);

  const finishEditingName = () => {
    if (
      modelPortfolioName !== modelPortfolio.model_portfolio.name &&
      modelPortfolioName!.trim().length > 0
    ) {
      modelPortfolio.model_portfolio.name = modelPortfolioName;
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
    } else {
      setModelPortfolioName(modelPortfolio.model_portfolio.name);
    }
    setEditName(false);
  };

  const handleDelete = (id: string) => {
    modelPortfolio.model_portfolio_asset_class.forEach((astCls, index) => {
      if (astCls.model_asset_class.id === id) {
        modelPortfolio.model_portfolio_asset_class.splice(index, 1);
        postData(
          `/api/v1/modelPortfolio/${modelPortfolio.model_portfolio.id}`,
          modelPortfolio,
        )
          .then(() => {
            dispatch(loadModelPortfolios());
          })
          .catch(() => {
            dispatch(loadModelPortfolios());
            toast.error('Deletion Failed', { autoClose: 3000 });
          });
      }
    });
  };

  return (
    <Box>
      <NameInputAndEdit
        value={modelPortfolioName}
        edit={editName}
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
        {modelPortfolio.model_portfolio_asset_class.map((cl) => {
          return (
            <li
              style={{
                borderLeft: '5px solid var(--brand-green)',
                lineHeight: '30px',
                padding: '10px',
                marginBottom: '20px',
              }}
              key={cl.model_asset_class.id}
            >
              <span style={{ fontSize: '26px' }}>
                {cl.percent}% {cl.model_asset_class.name}
              </span>
              <button
                onClick={() => handleDelete(cl.model_asset_class.id)}
                style={{ marginLeft: '50px', position: 'relative' }}
              >
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  size="sm"
                  style={{ position: 'relative' }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <FormContainer>
        <Formik
          initialValues={{
            assetClassId: '',
            percent: 0,
          }}
          initialStatus={{ submitted: false }}
          onSubmit={(values, actions) => {
            modelPortfolio.model_portfolio_asset_class.push({
              model_asset_class: {
                id: values.assetClassId!,
              },
              percent: values.percent.toFixed(3),
            });
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
              <AssetClassSelector
                name="assetClassId"
                id="assetClassId"
                assetClassesAvailable={getAvailableAssetClasses()}
                onSelect={props.handleChange}
              />
              <button type="submit" style={{ display: 'none' }}></button>
            </Form>
          )}
        </Formik>
      </FormContainer>
      {notAssetError && (
        <span style={{ color: 'red', padding: 'inherit' }}>
          Please select from the list of available asset classes and try again.
        </span>
      )}
    </Box>
  );
};

export default ModelPortoflioBox;
