import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../api';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { loadGroupInfo, loadGroups, loadModelPortfolios } from '../../actions';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import NameInputAndEdit from '../NameInputAndEdit';
import { ModelAssetClass } from '../../types/modelAssetClass';
import { useHistory } from 'react-router';
import {
  selectGroupInfoForModelPortfolio,
  selectGroupsUsingAModel,
} from '../../selectors/modelPortfolios';
import { FieldArray, Form, Formik } from 'formik';
import Grid from '../../styled/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import { Button } from '../../styled/Button';
import AssetClassSelector from './AssetClassSelector';
import { A, P } from '../../styled/GlobalElements';
import RouteLeavingGuard from '../RouteLeavingPrompt';
import Tooltip from '../Tooltip';

const Box = styled.div`
  border: 1px solid #bfb6b6;
  padding: 10px;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    margin-right: 0;
  }
`;

const MainContainer = styled.div`
  margin: 10px;
`;

const Cash = styled.div`
  border-left: 5px solid var(--brand-green);
  line-height: 30px;
  padding: 10px;
  margin-bottom: 20px;
`;

const CashPercentage = styled.div`
  font-size: 20px;
  font-weight: 900;
`;

const FormContainer = styled.div`
  border-bottom: 1px solid var(--brand-blue);
  margin-top: 20px;
  position: relative;
  display: flex;
`;

const Percentage = styled.div`
  position: relative;
  border-right: 1px solid var(--brand-blue);
  padding-bottom: 8px;
  width: 111px;
  display: flex;
  @media (max-width: 740px) {
    margin-bottom: 10px;
  }
`;

const PercentageInput = styled.input`
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 20px;
  text-align: right;
  width: 100%;
  padding-right: 22px;
  -webkit-appearance: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const PercentageLabel = styled.label`
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 20px;
  position: absolute;
  right: 2px;
  top: 2px;
`;

const Symbol = styled.span`
  font-size: 18px;
  margin-left: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
`;

const ApplyModelBtn = styled(Button)`
  background-color: transparent;
  color: var(--brand-blue);
  border: 1px solid var(--brand-blue);
`;

const CancelButton = styled(A)`
  margin-left: 20px;
`;

const ErroMsg = styled(P)`
  color: red;
  margin-top: 5px;
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

const Enter = styled.span`
  font-weight: 600;
  font-size: 16px;
  position: absolute;
  top: 0px;
  border: 1px solid #666b71;
  border-radius: 25px;
  padding: 3px 5px;
  color: #666b71;
  width: 96px;
  right: 0;
  text-align: center;
`;

type Props = {
  modelPortfolio: ModelPortfolioDetailsType;
  assetClasses: ModelAssetClass[];
  securityBased: boolean;
  sharedModel: boolean;
};

const ModelPortoflioBox = ({
  modelPortfolio,
  assetClasses,
  securityBased,
  sharedModel,
}: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [modelPortfolioName, setModelPortfolioName] = useState(
    modelPortfolio.model_portfolio.name,
  );
  const [editName, setEditName] = useState(false);
  const [clearInputSelector, setClearInputSelector] = useState(0);
  const [symbolError, setSymbolError] = useState('');

  const group = useSelector(selectGroupInfoForModelPortfolio);
  const groupsUsingModel = useSelector(selectGroupsUsingAModel);

  const groupInfo = group.groupInfo;
  const groupId = groupInfo?.groupId;
  const editMode = group.edit;
  const applyMode = group.apply;

  let model: any = modelPortfolio.model_portfolio_asset_class;
  if (securityBased) {
    model = modelPortfolio.model_portfolio_security;
  }
  const modelId = modelPortfolio.model_portfolio.id;
  const assignedPortfolioGroups =
    modelPortfolio.model_portfolio.total_assigned_portfolio_groups;

  const toggleEditMode = () => {
    if (editMode) {
      history.replace(`/app/model-portfolio/${modelId}`);
    } else {
      history.replace(`/app/model-portfolio/${modelId}?edit=true`);
    }
  };

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
          dispatch(loadGroupInfo());
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

  const applyModel = () => {
    let gpId = groupId;
    if (modelId && !groupId) {
      gpId = groupsUsingModel?.[modelId]?.groups[0].id;
    }
    postData(`api/v1/portfolioGroups/${gpId}/modelPortfolio/${modelId}`, {})
      .then((res) => {
        dispatch(loadGroups()); // need to load all groups to have an updated list of groups using a model in my models page
        dispatch(loadModelPortfolios());
        if (editMode) {
          toast.success(
            `Changes are saved for "${modelPortfolio.model_portfolio.name}"`,
          );
        } else {
          toast.success(
            `"${modelPortfolio.model_portfolio.name}" applied to "${groupInfo?.name}"`,
          );
        }
        if (groupId) {
          history.push(`/app/group/${gpId}`);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.detail);
        } else {
          toast.error('Cannot apply model');
        }
      });
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
      <MainContainer>
        <Formik
          initialValues={{
            targets: model,
            newTarget: {
              percent: 0,
              symbol: {},
              model_asset_class: {},
            },
            cash: 0,
          }}
          enableReinitialize
          initialStatus={{ submitted: false }}
          validate={(values) => {
            const errors: any = {};

            const targets = [...values.targets, values.newTarget];
            const total = targets.reduce((sum: string, target: any) => {
              if (target.percent) {
                return (+sum + +target.percent).toFixed(3);
              }
              return sum;
            }, '0');

            const cashPercentage = (100 - +total).toFixed(3);
            const roundedCashPercentage =
              Math.round(+cashPercentage * 1000) / 1000;
            if (roundedCashPercentage < -0 || roundedCashPercentage > 100) {
              errors.cash = 'The cash percentage should be between 0 and 100';
            }

            if (
              values.newTarget.percent < 0 ||
              values.newTarget.percent > 100
            ) {
              errors.newTarget = 'Percentage should be between 0 and 100';
            } else if (typeof values.newTarget.percent === 'string') {
              errors.newTarget = 'Percentage should be a number';
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            if (editMode) {
              toggleEditMode();
            }
            if (securityBased) {
              modelPortfolio.model_portfolio_security = values.targets;
            } else {
              modelPortfolio.model_portfolio_asset_class = values.targets;
            }
            postData(`/api/v1/modelPortfolio/${modelId}`, modelPortfolio)
              .then(() => {
                dispatch(loadModelPortfolios());
                if (editMode && assignedPortfolioGroups > 0) {
                  applyModel();
                }
              })
              .catch((err) => {
                dispatch(loadModelPortfolios());
                if (err.response) {
                  toast.error(err.response.data.detail);
                }
              });
            actions.resetForm();
            actions.setSubmitting(false);
            actions.setStatus({ submitted: true });
          }}
        >
          {(props) => (
            <Form>
              <FieldArray
                name="targets"
                render={(arrayHelpers) => {
                  const targets = [
                    ...props.values.targets,
                    props.values.newTarget,
                  ];
                  const total = targets.reduce((sum: string, target: any) => {
                    if (target.percent) {
                      return (+sum + +target.percent).toFixed(3);
                    }
                    return sum;
                  }, '0');

                  const cashPercentage = (100 - +total).toFixed(3);
                  let availableAssetClasses: any = [];
                  if (!securityBased) {
                    const usedAssetClasses = props.values.targets.map(
                      (astCls: any) => {
                        return astCls.model_asset_class.id;
                      },
                    );
                    // filter out the asset classes that have been already added
                    availableAssetClasses = assetClasses.filter(
                      (ast) => !usedAssetClasses.includes(ast.id),
                    );
                  }

                  const invalidSymbol =
                    (securityBased &&
                      Object.entries(props.values.newTarget.symbol).length ===
                        0) ||
                    (!securityBased &&
                      Object.entries(props.values.newTarget.model_asset_class)
                        .length === 0);

                  const handleKeyPress = (event: any) => {
                    if (event.key === 'Enter' && props.isValid) {
                      if (invalidSymbol) {
                        setSymbolError(
                          'Please select a supported symbol from the dropdown ',
                        );
                        setTimeout(() => setSymbolError(''), 2000);
                      } else {
                        arrayHelpers.push(props.values.newTarget);
                        props.setFieldValue('newTarget.symbol', {});
                        props.setFieldValue('newTarget.percent', 0);
                        setClearInputSelector(clearInputSelector + 1);
                      }
                    }
                  };
                  return (
                    <>
                      <div>
                        {props.errors.cash && (
                          <ErroMsg>{props.errors.cash}</ErroMsg>
                        )}
                        <Cash key="cash">
                          <CashPercentage>
                            {cashPercentage}% Cash
                          </CashPercentage>
                        </Cash>
                      </div>
                      {props.values.targets.map(
                        (target: any, index: number) => {
                          if (editMode || applyMode) {
                            return (
                              <Grid columns="1fr 50px" key={index}>
                                <FormContainer
                                  style={{ borderColor: '#beb6b6' }}
                                >
                                  <Percentage>
                                    <PercentageInput
                                      type="number"
                                      name={`targets.${index}`}
                                      value={
                                        props.values.targets[index].percent
                                      }
                                      onChange={(e) =>
                                        props.setFieldValue(
                                          `targets.${index}.percent` as 'targets',
                                          parseFloat(e.target.value),
                                        )
                                      }
                                      required
                                    />
                                    <PercentageLabel htmlFor="percentage">
                                      %
                                    </PercentageLabel>
                                  </Percentage>
                                  <Symbol>
                                    {securityBased ? (
                                      <>
                                        <span
                                          style={{
                                            fontWeight: 600,
                                            marginRight: '8px',
                                          }}
                                        >
                                          {
                                            props.values.targets[index].symbol
                                              ?.symbol
                                          }
                                        </span>
                                        {
                                          props.values.targets[index].symbol
                                            ?.description
                                        }
                                      </>
                                    ) : (
                                      <span
                                        style={{
                                          fontWeight: 600,
                                          marginRight: '8px',
                                        }}
                                      >
                                        {
                                          props.values.targets[index]
                                            .model_asset_class.name
                                        }
                                      </span>
                                    )}
                                  </Symbol>

                                  <br></br>
                                </FormContainer>
                                {(editMode || applyMode) && (
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTimes}
                                      size="lg"
                                      color="var(--grey-darkest)"
                                    />
                                  </button>
                                )}
                              </Grid>
                            );
                          } else {
                            return (
                              <Cash key={index}>
                                <CashPercentage style={{ fontWeight: 500 }}>
                                  {target.percent}%{' '}
                                  {securityBased
                                    ? target.symbol.symbol
                                    : target.model_asset_class.name}
                                </CashPercentage>
                              </Cash>
                            );
                          }
                        },
                      )}
                      {(editMode || applyMode) && (
                        <div style={{ marginTop: '30px' }}>
                          <FormContainer>
                            <Percentage>
                              <PercentageInput
                                id="percent"
                                name="newTarget.percent"
                                type="number"
                                onChange={props.handleChange}
                                value={props.values.newTarget.percent}
                                onKeyPress={(e: any) => handleKeyPress(e)}
                                required
                              />
                              <PercentageLabel htmlFor="percentage">
                                %
                              </PercentageLabel>
                            </Percentage>
                            {securityBased ? (
                              <SymbolSelector
                                name="newTarget.symbol"
                                id="symbol"
                                value={null}
                                onSelect={(symbol) => {
                                  props.setFieldValue(
                                    'newTarget.symbol',
                                    symbol,
                                  );
                                }}
                                clearInput={clearInputSelector}
                                onKeyPress={(e: any) => handleKeyPress(e)}
                                groupId={groupId ? groupId : ''}
                                forModelSecurity={true}
                              />
                            ) : (
                              <AssetClassSelector
                                name="newTarget.model_asset_class"
                                id="symbol"
                                availableAssetClasses={availableAssetClasses}
                                onSelect={(symbol: any) => {
                                  props.setFieldValue(
                                    'newTarget.model_asset_class',
                                    symbol,
                                  );
                                }}
                              />
                            )}
                            {/* Only display "Press Enter" when a symbol/asset class selected */}
                            {(Object.keys(props.values.newTarget.symbol)
                              .length !== 0 ||
                              Object.keys(
                                props.values.newTarget.model_asset_class,
                              ).length !== 0) &&
                              props.isValid && <Enter>Press Enter</Enter>}
                          </FormContainer>
                          <div>
                            <ul>
                              <li>
                                {props.errors.newTarget && (
                                  <ErroMsg>{props.errors.newTarget}</ErroMsg>
                                )}
                              </li>
                              <li>
                                {symbolError !== '' && (
                                  <ErroMsg>{symbolError}</ErroMsg>
                                )}
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </>
                  );
                }}
              />
              <ButtonContainer>
                {editMode && (
                  <>
                    <Button
                      type="button"
                      onClick={() => {
                        props.handleSubmit();
                      }}
                      disabled={!props.dirty || !props.isValid}
                    >
                      Save Model
                    </Button>
                    <CancelButton
                      onClick={() => {
                        toggleEditMode();
                        props.handleReset();
                      }}
                    >
                      Cancel
                    </CancelButton>
                  </>
                )}
                {!props.dirty && applyMode && (
                  <ApplyModelBtn onClick={applyModel}>
                    Apply to {groupInfo?.name}
                  </ApplyModelBtn>
                )}
              </ButtonContainer>
              <RouteLeavingGuard
                when={props.dirty}
                navigate={(path) => history.push(path)}
              />
            </Form>
          )}
        </Formik>
        {!editMode && !applyMode && (
          <Button
            onClick={toggleEditMode}
            disabled={assignedPortfolioGroups > 1}
          >
            Edit Model
          </Button>
        )}
      </MainContainer>
    </Box>
  );
};

export default ModelPortoflioBox;
