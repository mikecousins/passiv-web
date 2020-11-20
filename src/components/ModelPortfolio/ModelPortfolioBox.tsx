import React, { useState } from 'react';
import { ModelAssetClass } from '../../types/modelAssetClass';
import NameInputAndEdit from '../NameInputAndEdit';
import AssetClassSelector from './AssetClassSelector';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Button } from '../../styled/Button';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { postData } from '../../api';
import { useDispatch } from 'react-redux';
import { loadModelPortfolio } from '../../actions';
import { Formik, Form, Field } from 'formik';

const Box = styled.div`
  border: 1px solid #bfb6b6;
  margin-right: 50px;
  padding: 10px;
  margin-bottom: 20px;
`;

const StyledContainer = styled.div`
  background: #fff;
  display: inline-block;
  position: relative;
  top: -24px;
  padding: 0 15px;
  margin-bottom: -7px;
`;
const Percentage = styled.div`
  display: inline-block;
`;

const PercentageLabel = styled.label`
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
  margin-right: 10px;
`;

const PercentageInput = styled(Field)`
  max-width: 70px;
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
  /* -moz-appearance: textfield; */
`;

const StyledName = styled.span`
  font-weight: 600;
  font-size: 30px;
`;

type Props = {
  assetClasses: ModelAssetClass[];
  modelPortfolio: ModelPortfolioDetailsType;
  allocatedPercent: number;
};

const ModelPortoflioBox = ({
  assetClasses,
  modelPortfolio,
  allocatedPercent,
}: Props) => {
  const dispatch = useDispatch();
  const [
    listOfAssetClassesAvailable,
    setListOfAssetClassesAvailable,
  ] = useState(assetClasses);

  const [modelPortfolioName, setModelPortfolioName] = useState(
    modelPortfolio.model_portfolio.name,
  );
  const [editName, setEditName] = useState(false);
  const [notAssetError, setNotAssetError] = useState(false);
  const [remainingPercent, setRemainingPercent] = useState(
    100 - allocatedPercent,
  );

  //! 1- make it so user can't put string in
  //! 2- math
  // const validatePercentage = (value: any) => {
  //   let error;
  //   if (+value > 100) {
  //     error = 'Percentage cant be larger than 100';
  //   } else if (!value) {
  //     error = 'Required';
  //   }
  //   return error;
  // };
  const finishEditingName = () => {
    if (
      modelPortfolioName !== modelPortfolio.model_portfolio.name &&
      modelPortfolioName!.trim().length > 0
    ) {
      modelPortfolio.model_portfolio.name = modelPortfolioName;

      postData(
        '/api/v1/modelPortfolio/cc095d43-9170-4de0-8729-1acfaf4c5832',
        modelPortfolio,
      )
        .then(() => {
          dispatch(loadModelPortfolio());
        })
        .catch(() => {
          dispatch(loadModelPortfolio()); //! when fails, the state doesn't changes to what it was
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
    modelPortfolio.model_portfolio_asset_class.map((target, index) => {
      if (target.model_asset_class.id === id) {
        modelPortfolio.model_portfolio_asset_class.splice(index, 1);
        postData(
          '/api/v1/modelPortfolio/cc095d43-9170-4de0-8729-1acfaf4c5832',
          modelPortfolio,
        )
          .then(() => {
            dispatch(loadModelPortfolio());
          })
          .catch(() => {
            dispatch(loadModelPortfolio()); //! when fails, the state doesn't changes to what it was
            toast.error(
              `${modelPortfolio.model_portfolio.name} Asset Class Deletion Failed`,
              { autoClose: 3000 },
            );
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
      {modelPortfolio ? (
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
              {remainingPercent}% Cash
            </span>
          </li>
          {modelPortfolio.model_portfolio_asset_class.map((cl: any) => {
            // console.log(modelPortfolio);

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
      ) : null}

      <div
        style={{ borderBottom: '1px solid var(--brand-blue)', margin: '20px' }}
      >
        <Formik
          initialValues={{
            assetClassId: '',
            percent: remainingPercent,
          }}
          initialStatus={{ submitted: false }}
          onSubmit={(values, actions) => {
            modelPortfolio.model_portfolio.model_type = 1; //Todo this doesn't need to get reassigned every time
            modelPortfolio.model_portfolio_asset_class.push({
              model_asset_class: {
                id: values.assetClassId!,
              },
              percent: values.percent,
            });
            postData(
              'api/v1/modelPortfolio/cc095d43-9170-4de0-8729-1acfaf4c5832',
              modelPortfolio,
            )
              .then(() => {
                dispatch(loadModelPortfolio());

                // updating the total
                setRemainingPercent(remainingPercent - values.percent);

                // filtering out the asset class that got added
                let copy = [...listOfAssetClassesAvailable];
                const usedAssetClasses = modelPortfolio.model_portfolio_asset_class.map(
                  (astcls) => {
                    return astcls.model_asset_class.id;
                  },
                );
                copy = copy.filter((ast) => !usedAssetClasses.includes(ast.id));
                setListOfAssetClassesAvailable(copy);
                actions.resetForm();
              })
              .catch((err) => {
                dispatch(loadModelPortfolio());
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
                  // validate={validatePercentage}
                  min="0"
                  max={remainingPercent}
                  required
                />
                <PercentageLabel htmlFor="percentage">%</PercentageLabel>
                {/* {props.errors.percent} */}
              </Percentage>
              <AssetClassSelector
                name="assetClassId"
                id="assetClassId"
                assetClassesAvailable={listOfAssetClassesAvailable}
                onSelect={props.handleChange}
              />
              <button type="submit" style={{ display: 'none' }}></button>
            </Form>
          )}
        </Formik>
      </div>
      {notAssetError ? (
        <>
          <span style={{ color: 'red' }}>
            Please select from the list of available asset classes and try
            again.
          </span>
          <br></br>
        </>
      ) : null}

      <Button style={{ margin: '30px 20px' }}>Save Model</Button>
    </Box>
  );
};

export default ModelPortoflioBox;
